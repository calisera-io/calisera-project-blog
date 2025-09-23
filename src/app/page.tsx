import Link from 'next/link'
import { getAllPosts } from '../lib/posts'

export default function HomePage() {
  const posts = getAllPosts().slice(0, 3) // Show latest 3 posts

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <header className="text-center mb-12">
        <h1 className="text-5xl font-bold mb-4">Calisera Blog</h1>
        <p className="text-xl text-gray-600">Welcome to our blog</p>
      </header>

      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-6">Latest Posts</h2>
        <div className="space-y-6">
          {posts.map((post) => (
            <article key={post.slug} className="border-b pb-6">
              <Link href={`/blog/${post.slug}`} className="block hover:opacity-80">
                <h3 className="text-2xl font-semibold mb-2">{post.title}</h3>
                <p className="text-gray-600 mb-2">{post.excerpt}</p>
                <span className="text-sm text-gray-500">{post.date}</span>
              </Link>
            </article>
          ))}
        </div>
        <div className="mt-8 text-center">
          <Link 
            href="/blog" 
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700"
          >
            View All Posts
          </Link>
        </div>
      </section>
    </div>
  )
}
