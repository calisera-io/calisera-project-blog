import Link from 'next/link'
import Image from 'next/image'
import { Post } from '@/lib/posts'

interface PostCardProps {
  post: Post
}

export default function RegularPostCard({ post }: PostCardProps) {
  return (
    <article 
      className="w-full rounded-[32px] border border-[#E4E4E4] dark:border-[#404551] bg-white dark:bg-[#111827] p-6 md:p-8 text-left shadow-none transition-shadow hover:shadow-[0_6px_24px_rgba(0,0,0,0.06)] max-w-none"
      aria-label={`Article: ${post.title}`}
    >
      <Link 
        href={`/blog/post/${post.slug}`} 
        className="block hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-[32px]"
        aria-label={`Read article: ${post.title}`}
      >
        {/* Featured Image */}
        {post.heroImage && (
          <div className="w-full h-48 md:h-64 mb-6 overflow-hidden rounded-2xl">
            <Image
              src={post.heroImage}
              alt={post.imageAlt || `Featured image for article: ${post.title}`}
              width={600}
              height={300}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        {/* Meta Info */}
        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 dark:text-gray-400 mb-4">
          {post.author && (
            <span className="flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <span className="sr-only">Author: </span>
              {post.author}
            </span>
          )}
          <span className="flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span className="sr-only">Published on: </span>
            <time dateTime={post.date}>{post.date}</time>
          </span>
          {post.readTime && (
            <span className="flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="sr-only">Reading time: </span>
              {post.readTime}
            </span>
          )}
        </div>

        {/* Title */}
        <h3 className="text-2xl font-semibold mb-2 text-gray-900 dark:text-white">
          {post.title}
        </h3>
        
        {/* Excerpt */}
        <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
          {post.excerpt}
        </p>

        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-4" role="list" aria-label="Article tags">
            {post.tags.map((tag: string, index: number) => (
              <span
                key={`${post.slug}-${tag}-${index}`}
                className="inline-flex items-center gap-1.5 px-4 py-1 rounded-3xl text-sm transition-colors bg-[#EFE6FF]/20 text-black/70 dark:text-[#EFE6FF] hover:bg-[#EFE6FF]/70"
                role="listitem"
              >
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                </svg>
                <span className="sr-only">Tag: </span>
                {tag}
              </span>
            ))}
          </div>
        )}
      </Link>
    </article>
  )
}