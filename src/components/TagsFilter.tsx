import Link from "next/link";
import { Tag } from '@/lib/posts';

interface TagsFilterProps {
  tags: Tag[];
  activeTagSlug?: string;
}

export default function TagsFilter({ tags, activeTagSlug }: TagsFilterProps) {
  return (
    <ul
      className="flex flex-wrap gap-x-3 gap-y-3 mt-6 mb-10"
      role="list"
      aria-label="Filter blog posts by tag"
    >
      <li>
        <Link
          href="/"
          className={`px-3 py-1.5 rounded-full text-sm font-medium border transition-colors ${
            !activeTagSlug
              ? "bg-cyan-400/50 text-gray-800 border-cyan-400/50"
              : "text-gray-700 dark:text-gray-300 border-gray-300 hover:bg-cyan-200/30 dark:hover:bg-gray-800"
          }`}
        >
          All
        </Link>
      </li>

      {tags.map((tag) => {
        const isActive = tag.slug === activeTagSlug;
        return (
          <li key={tag.name}>
            <Link
              href={`/blog/${tag.slug}`}
              className={`px-3 py-1.5 rounded-full text-sm font-medium border transition-colors ${
                isActive
                  ? "bg-cyan-400/50 text-gray-800 border-cyan-400/50"
                  : "text-gray-700 dark:text-gray-300 border-gray-300 hover:bg-cyan-200/30 dark:hover:bg-gray-800"
              }`}
            >
              {tag.name}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
