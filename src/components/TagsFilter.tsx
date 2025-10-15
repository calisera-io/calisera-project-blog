import Link from "next/link";
import { Tag } from '@/lib/posts';

interface TagsFilterProps {
  tags: Tag[];
  activeTagName?: string;
}

export default function TagsFilter({ tags, activeTagName }: TagsFilterProps) {
  return (
    <ul
      className="flex flex-wrap gap-3 mt-6 mb-10"
      role="list"
      aria-label="Filter blog posts by tag"
    >
      <li>
        <Link
          href="/blog"
          className={`px-4 py-2 rounded-full text-sm font-medium border transition-colors ${
            !activeTagName
              ? "bg-blue-600 text-white border-blue-600"
              : "text-gray-700 dark:text-gray-300 border-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
          }`}
        >
          All
        </Link>
      </li>

      {tags.map((tag) => {
        const isActive = tag.name === activeTagName;
        return (
          <li key={tag.name}>
            <Link
              href={`/blog/${tag.slug}`}
              className={`px-4 py-2 rounded-full text-sm font-medium border transition-colors ${
                isActive
                  ? "bg-blue-600 text-white border-blue-600"
                  : "text-gray-700 dark:text-gray-300 border-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
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
