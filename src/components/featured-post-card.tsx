import { joinWithAnd } from '@/lib/authors';
import { Post } from '@/lib/posts';
import Image from 'next/image';
import Link from 'next/link';

interface FeaturedPostCardProps {
	post: Post;
}

export function FeaturedPostCard({ post }: FeaturedPostCardProps) {
	return (
		<Link href={`/blog/post/${post.slug}`}>
			<article className="w-full rounded-[32px] border border-[#E4E4E4] dark:border-[#404551] bg-white dark:bg-[#111827] p-6 md:p-8 text-left shadow-none transition-shadow hover:shadow-[0_6px_24px_rgba(0,0,0,0.06)] max-w-none cursor-pointer">
				<div className="flex flex-col md:flex-row gap-6">
					{/* Content Section */}
					<div className="flex-1">
						{/* Meta Info */}
						<div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 dark:text-gray-400 mb-4">
							{post.authors && (
								<span className="flex items-center gap-2">
									<svg
										className="w-4 h-4"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
										/>
									</svg>
									{joinWithAnd(post.authors)}
								</span>
							)}
							<span className="flex items-center gap-2">
								<svg
									className="w-4 h-4"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
									/>
								</svg>
								{post.date}
							</span>
							{post.readTime && (
								<span className="flex items-center gap-2">
									<svg
										className="w-4 h-4"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
										/>
									</svg>
									{post.readTime}
								</span>
							)}
						</div>

						{/* Title */}
						<h3 className="text-2xl md:text-3xl font-semibold mb-3 text-gray-900 dark:text-white line-clamp-2">
							{post.title}
						</h3>

						{/* Excerpt */}
						<p className="text-gray-600 dark:text-gray-300 mb-6 line-clamp-3 leading-relaxed">
							{post.excerpt}
						</p>

						{/* Tags */}
						{post.tags && post.tags.length > 0 && (
							<div className="flex flex-wrap gap-2 mb-6">
								{post.tags.slice(0, 4).map((tag) => (
									<span
										key={tag}
										className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
									>
										<svg
											className="w-3 h-3"
											fill="none"
											stroke="currentColor"
											viewBox="0 0 24 24"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth={2}
												d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
											/>
										</svg>
										{tag}
									</span>
								))}
								{post.tags.length > 4 && (
									<span className="text-gray-500 text-xs">
										+{post.tags.length - 4} more
									</span>
								)}
							</div>
						)}
					</div>

					{/* Image Section */}
					{post.heroImage && (
						<div className="w-full md:w-80 h-64 md:h-auto flex-shrink-0">
							<div className="relative w-full h-full rounded-2xl overflow-hidden">
								<Image
									src={post.heroImage}
									alt={post.imageAlt || post.title}
									fill
									className="object-cover"
									sizes="(max-width: 768px) 100vw, 320px"
								/>
							</div>
						</div>
					)}
				</div>
			</article>
		</Link>
	);
}
