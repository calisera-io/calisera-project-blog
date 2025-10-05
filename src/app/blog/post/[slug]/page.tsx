import { getAllPosts, getPostBySlug } from '../../../../lib/posts'

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
    <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <article>
        <header className="max-w-4xl">
          <h1 className="text-[42px] md:text-[64px] font-medium mb-4 text-[#111827] dark:text-white leading-[1.1] md:leading-[1.06]">{post.title}</h1>
          <div className="text-gray-600">
            <span>{post.date}</span>
            {post.author && <span className="ml-4">by {post.author}</span>}
          </div>
          {post.tags && (
            <div className="mt-4 flex flex-wrap gap-3">
              {post.tags.map((tag: string) => (
                <span key={tag} className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm transition-colors bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600">
                  {tag}
                </span>
              ))}
            </div>
          )}
        </header>
        <div 
          className="prose-tight-spacing prose prose-lg prose-headings-medium prose-responsive prose-bold max-w-none my-16 [&_img]:rounded-xl md:[&_img]:max-w-2/3"
          dangerouslySetInnerHTML={{ __html: post.contentHtml || '' }} 
        />
      </article>
    </div>
  )
}
