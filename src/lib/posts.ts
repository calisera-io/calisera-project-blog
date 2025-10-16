import fs from 'fs';
import matter from 'gray-matter';
import path from 'path';
import { remark } from 'remark';
import remarkHtml from 'remark-html';

const postsDirectory = path.join(process.cwd(), 'content/posts');

export interface Post {
	slug: string;
	title: string;
	date: string;
	excerpt: string;
	authors: string[];
	tags?: string[];
	featured?: boolean;
	readTime?: string;
	contentHtml?: string;
	featuredImages?: string[];
	heroImage?: string;
	imageAlt?: string;
}

export interface Tag {
	name: string;
	slug: string;
	count: number;
}

export function getAllPosts(): Post[] {
	if (!fs.existsSync(postsDirectory)) {
		return [];
	}
	const fileNames = fs.readdirSync(postsDirectory);
	return fileNames
		.filter((name) => name.endsWith('.md'))
		.map((name) => {
			const fullPath = path.join(postsDirectory, name);
			const fileContents = fs.readFileSync(fullPath, 'utf8');
			const { data } = matter(fileContents);

			return {
				slug: name.replace(/\.md$/, ''),
				...data,
			} as Post;
		})
		.sort(
			(a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
		);
}

export function getFeaturedPosts(): Post[] {
	return getAllPosts().filter((post) => post.featured);
}

export async function getPostBySlug(slug: string): Promise<Post> {
	const fullPath = path.join(postsDirectory, `${slug}.md`);
	const fileContents = await fs.promises.readFile(fullPath, 'utf8');
	const { data, content } = matter(fileContents);

	const processedContent = await remark().use(remarkHtml).process(content);
	const contentHtml = processedContent.toString();

	return {
		slug,
		contentHtml,
		...data,
	} as Post;
}

const normalizeTagName = (name: string): string =>
	name
		.replace(/[\/\s]+/g, '-')
		.toLowerCase()
		.trim();

export function getAllTags(): Tag[] {
	const tagCountsMap: Record<string, Tag> = {};

	for (const post of getAllPosts()) {
		if (!post.tags) continue;

		for (const name of post.tags) {
			if (!name) continue;

			const slug = normalizeTagName(name);

			const existing = tagCountsMap[slug];

			if (existing) {
				if (existing.name !== name) {
					throw new Error(`Mistyped tag name: ${name}`);
				}
				existing.count += 1;
			} else {
				tagCountsMap[slug] = {
					name,
					slug,
					count: 1,
				};
			}
		}
	}

	return Object.values(tagCountsMap).sort((a, b) => b.count - a.count);
}

export function getPostsByTag(targetTag: string): Post[] {
	return getAllPosts().filter((post) =>
		post.tags?.some((tag) => normalizeTagName(tag) == targetTag),
	);
}

export function getOrderedPosts(tagFilter?: string): {
	featuredPost: Post | null;
	regularPosts: Post[];
	totalCount: number;
} {
	const allPosts = getAllPosts();
	const featuredPosts = getFeaturedPosts();

	if (!tagFilter) {
		return {
			featuredPost: featuredPosts[0] || null,
			regularPosts: allPosts.filter((post) => !post.featured),
			totalCount: allPosts.length,
		};
	}

	const taggedPosts = getPostsByTag(tagFilter);
	const sortedTaggedPosts = [...taggedPosts].sort(
		(a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
	);

	const featuredWithTag = featuredPosts.find((post) =>
		hasTag(post, tagFilter),
	);

	const featuredPost = featuredWithTag || sortedTaggedPosts[0] || null;

	const regularPosts = sortedTaggedPosts.filter(
		(post) => post.slug !== featuredPost?.slug,
	);

	return {
		featuredPost,
		regularPosts,
		totalCount: taggedPosts.length,
	};
}

function hasTag(post: Post, targetTag: string): boolean {
	return (
		post.tags?.some(
			(tag) =>
				tag.toLowerCase().trim() === targetTag.toLowerCase().trim(),
		) ?? false
	);
}
