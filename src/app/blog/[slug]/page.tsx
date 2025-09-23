import { getAllPosts, getPostBySlug } from '../../../lib/posts'

export async function generateStaticParams() {
  const posts = getAllPosts()
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = await getPostBySlug(slug)

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <article>
        <header className="mb-8">
          <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
          <div className="text-gray-600">
            <span>{post.date}</span>
            {post.author && <span className="ml-4">by {post.author}</span>}
          </div>
          {post.tags && (
            <div className="mt-4">
              {post.tags.map((tag: string) => (
                <span key={tag} className="inline-block bg-gray-200 px-3 py-1 rounded mr-2 text-sm">
                  {tag}
                </span>
              ))}
            </div>
          )}
        </header>
        <div 
          className="prose prose-lg max-w-none"
          dangerouslySetInnerHTML={{ __html: post.contentHtml || '' }} 
        />
      </article>
    </div>
  )
}
