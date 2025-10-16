import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import remarkHtml from 'remark-html'

const postsDirectory = path.join(process.cwd(), 'content/posts')

export interface Post {
  slug: string
  title: string
  date: string
  excerpt: string
  author?: string
  tags?: string[]
  featured?: boolean
  readTime?: string 
  contentHtml?: string
  featuredImages?: string[]
  heroImage?: string
  imageAlt?: string
}

export interface Tag {
  name: string
  slug: string
  count: number
}

export interface OrderedPosts {
  featuredPost: Post | null
  regularPosts: Post[]
  totalCount: number
}

export function getAllPosts(): Post[] {
  if (!fs.existsSync(postsDirectory)) {
    return []
  }
  const fileNames = fs.readdirSync(postsDirectory)
  return fileNames
    .filter(name => name.endsWith('.md'))
    .map((name) => {
      const fullPath = path.join(postsDirectory, name)
      const fileContents = fs.readFileSync(fullPath, 'utf8')
      const { data } = matter(fileContents)
      
      return {
        slug: name.replace(/\.md$/, ''),
        ...data
      } as Post
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export function getFeaturedPosts(): Post[] {
  return getAllPosts().filter(post => post.featured)
}

export async function getPostBySlug(slug: string): Promise<Post> {
  const fullPath = path.join(postsDirectory, `${slug}.md`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const { data, content } = matter(fileContents)
  
  const processedContent = await remark()
    .use(remarkHtml)
    .process(content)
  const contentHtml = processedContent.toString()
  
  return {
    slug,
    contentHtml,
    ...data
  } as Post
}

const normalizeTagName = (tagName: string): string => tagName.replace(/[\/\s]+/g, '-').toLowerCase().trim();

export function getAllTags(): Tag[] {
  return getAllPosts()
    .flatMap(post => post.tags)
    .reduce<Tag[]>((acc, tagName) => {
      if (!tagName) return acc;
      const normalizedTag = normalizeTagName(tagName);
      const existing = acc.find(t => t.slug === normalizedTag);
      if (existing) {
        if (existing.name != tagName) throw new Error(`Misspelled tag name: ${tagName}`);
        existing.count += 1;
      } else {
        acc.push({ 
          name: tagName, 
          slug: normalizedTag, 
          count: 1 
        });
      }
      return acc;
    }, [])
    .sort((a, b) => b.count - a.count);
}

export function getPostsByTag(targetTag: string): Post[] {
  return getAllPosts().filter(post => 
      post.tags?.some(tag => normalizeTagName(tag) == targetTag)
  )
}

export function getOrderedPosts(tagFilter?: string): OrderedPosts {
  // Get base data
  const allPosts = getAllPosts()
  const featuredPosts = getFeaturedPosts()
  
  // No tag filter - simple case
  if (!tagFilter) {
    return {
      featuredPost: featuredPosts[0] || null,
      regularPosts: allPosts.filter(post => !post.featured),
      totalCount: allPosts.length
    }
  }
  
  // Tag filter - get posts with tag
  const taggedPosts = getPostsByTag(tagFilter)
  const sortedTaggedPosts = [...taggedPosts].sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  )
  
  // Find featured post with this tag
  const featuredWithTag = featuredPosts.find(post => 
    hasTag(post, tagFilter)
  )
  
  // Determine featured post
  const featuredPost = featuredWithTag || sortedTaggedPosts[0] || null
  
  // Get regular posts (everything except the featured one)
  const regularPosts = sortedTaggedPosts.filter(post => 
    post.slug !== featuredPost?.slug
  )
  
  return {
    featuredPost,
    regularPosts,
    totalCount: taggedPosts.length
  }
}

// Helper function to check if post has tag
function hasTag(post: Post, targetTag: string): boolean {
  return post.tags?.some(tag => 
    tag.toLowerCase().trim() === targetTag.toLowerCase().trim()
  ) ?? false
}

