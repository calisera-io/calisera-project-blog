jest.mock('fs', () => ({
	promises: {
		writeFile: jest.fn(),
		readFile: jest.fn(),
	},
	existsSync: jest.fn(),
	readFileSync: jest.fn(),
	readdirSync: jest.fn(),
}));
jest.mock('gray-matter');
jest.mock('remark');
jest.mock('remark-html');

import fs from 'fs';
import matter from 'gray-matter';
import { getAllPosts, getPostBySlug } from '../posts';

const mockFs = fs as jest.Mocked<typeof fs>;
mockFs.existsSync.mockReturnValue(true);

const mockMatter = matter as jest.MockedFunction<typeof matter>;

describe('posts', () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	describe('getAllPosts', () => {
		it('returns sorted posts from markdown files', () => {
			mockFs.readdirSync.mockReturnValue([
				'post1.md',
				'post2.md',
				'other.txt',
			] as unknown as ReturnType<typeof fs.readdirSync>);
			mockFs.readFileSync
				.mockReturnValueOnce('content1')
				.mockReturnValueOnce('content2');

			mockMatter
				.mockReturnValueOnce({
					data: { title: 'Post 1', date: '2023-01-01' },
					content: '',
					orig: '',
					language: '',
					matter: '',
					stringify: jest.fn(),
				})
				.mockReturnValueOnce({
					data: { title: 'Post 2', date: '2023-01-02' },
					content: '',
					orig: '',
					language: '',
					matter: '',
					stringify: jest.fn(),
				});

			const posts = getAllPosts();

			expect(posts).toHaveLength(2);
			expect(posts[0].slug).toBe('post2');
			expect(posts[1].slug).toBe('post1');
		});

		it('filters out non-markdown files', () => {
			mockFs.readdirSync.mockReturnValue([
				'post.md',
				'readme.txt',
			] as unknown as ReturnType<typeof fs.readdirSync>);
			mockFs.readFileSync.mockReturnValue('content');
			mockMatter.mockReturnValue({
				data: { title: 'Post', date: '2023-01-01' },
				content: '',
				orig: '',
				language: '',
				matter: '',
				stringify: jest.fn(),
			});

			const posts = getAllPosts();

			expect(posts).toHaveLength(1);
			expect(mockFs.readFileSync).toHaveBeenCalledTimes(1);
		});
	});

	describe('getPostBySlug', () => {
		it('returns post with processed HTML content', async () => {
			mockFs.readFileSync.mockReturnValue('# Content');
			mockMatter.mockReturnValue({
				data: { title: 'Test Post', date: '2023-01-01' },
				content: '# Content',
				orig: '',
				language: '',
				matter: '',
				stringify: jest.fn(),
			});

			const post = await getPostBySlug('test-post');

			expect(post.slug).toBe('test-post');
			expect(post.contentHtml).toBe('<h1>Content</h1>');
		});
	});
});
