'use client'

import { useRouter, useSearchParams } from 'next/navigation'

interface Tag {
  name: string
  slug: string
  displayName: string
  count: number
}

interface TagsFilterProps {
  tags: Tag[]
}

export default function TagsFilter({ tags }: TagsFilterProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const activeTag = searchParams.get('tag')

  const handleTagClick = (tagSlug: string) => {
    const current = new URLSearchParams(Array.from(searchParams.entries()))
    
    if (activeTag === tagSlug) {
      // Remove tag filter if clicking the same tag
      current.delete('tag')
    } else {
      // Set new tag filter
      current.set('tag', tagSlug)
    }

    const search = current.toString()
    const query = search ? `?${search}` : ''
    router.push(`/blog${query}`)
  }

  const clearFilter = () => {
    router.push('/blog')
  }

  if (tags.length === 0) {
    return null
  }

  return (
      <div className="max-w-7xl mx-auto py-8">
        <div className="flex flex-wrap gap-3">
          {/* Show "All" button when a tag is active */}
          {activeTag && (
            <button
              onClick={clearFilter}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm transition-colors bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
            >
              All Posts
            </button>
          )}
          
          {tags.map((tag) => (
            <button
              key={tag.slug}
              onClick={() => handleTagClick(tag.slug)}
              className={`inline-flex items-center gap-1.5 px-4 py-1 rounded-3xl text-sm transition-colors ${
                activeTag === tag.slug
                  ? 'bg-[#EFE6FF] text-black/70' // Active state
                  : 'bg-[#EFE6FF]/20 text-black/70 dark:text-[#EFE6FF] hover:bg-[#EFE6FF]/70'
              }`}
            >
              {tag.displayName}
            </button>
          ))}
        </div>
      </div>
  )
}