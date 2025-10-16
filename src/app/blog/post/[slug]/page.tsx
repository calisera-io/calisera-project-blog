import { getAllPosts, getPostBySlug } from '../../../../lib/posts'
import GradientBackground from '@/components/GradientBackground'

const postGradients = {
  light: [
    { left: "25%", top: "5%", width: "600px", height: "600px", color: "#E34290", opacity: "0.30", blur: "90px", rotate: "15deg" },
    { left: "65%", top: "10%", width: "500px", height: "500px", color: "#F472B6", opacity: "0.30", blur: "90px", rotate: "-30deg" },
    { left: "50%", top: "0%", width: "400px", height: "400px", color: "#E34290", opacity: "0.25", blur: "70px", rotate: "75deg" },
  ],
  dark: [
    { left: "35%", top: "5%", width: "600px", height: "600px", color: "#E34290", opacity: "0.30", blur: "90px", rotate: "15deg" },
    { left: "65%", top: "10%", width: "500px", height: "500px", color: "#F472B6", opacity: "0.30", blur: "90px", rotate: "-30deg" },
    { left: "50%", top: "0%", width: "400px", height: "400px", color: "#E34290", opacity: "0.25", blur: "70px", rotate: "75deg" },
  ],
};

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
    <div className="relative overflow-x-clip">
      <GradientBackground lightOrbs={postGradients.light} darkOrbs={postGradients.dark} />
      <div className="relative z-10 max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <article>
        <header className="max-w-7xl">
          <h1 className="text-[36px] md:text-[52px] font-bold mb-4 text-[#111827] dark:text-white leading-[1.2] md:leading-[1.25]">{post.title}</h1>
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
    </div>
  )
}
