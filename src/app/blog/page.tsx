import Link from 'next/link'
import { getAllPosts } from '../../lib/posts'

export default function BlogPage() {
  const posts = getAllPosts()

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Blog</h1>
      <div className="space-y-6">
        {posts.map((post) => (
          <article key={post.slug} className="border-b pb-6">
            <Link href={`/blog/${post.slug}`} className="block hover:opacity-80">
              <h2 className="text-2xl font-semibold mb-2">{post.title}</h2>
              <p className="text-gray-600 mb-2">{post.excerpt}</p>
              <div className="text-sm text-gray-500">
                <span>{post.date}</span>
                {post.tags && (
                  <span className="ml-4">
                    {post.tags.map((tag: string) => (
                      <span key={tag} className="inline-block bg-gray-200 px-2 py-1 rounded mr-2">
                        {tag}
                      </span>
                    ))}
                  </span>
                )}
              </div>
            </Link>
          </article>
        ))}
      </div>
    </div>
  )
}
