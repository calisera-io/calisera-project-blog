import Link from 'next/link';

export function Footer() {
	return (
		<footer className="border-t border-black/5 dark:border-white/5 bg-white/50 dark:bg-gray-900/50 supports-[backdrop-filter]:md:backdrop-blur-lg mt-32 mb-8">
			<div className="border-t border-black/5 pt-8 dark:border-white/5">
				<div className="flex flex-col items-center justify-center gap-5 sm:flex-row sm:gap-12 md:gap-16 xl:gap-24">
					<Link
						href="/"
						className="text-black px-3 py-2 text-sm transition-colors duration-150 hover:text-black dark:text-gray-300 dark:hover:text-white"
					>
						Contact
					</Link>
					<Link
						href="/blog"
						className="text-black px-3 py-2 text-sm transition-colors duration-150 hover:text-black dark:text-gray-300 dark:hover:text-white"
					>
						Imprint
					</Link>
				</div>
			</div>
		</footer>
	);
}
