import Link from 'next/link';

export default function Header() {
  return (
    <header className="w-full bg-transparent border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-24">
          {/* Logo/Brand */}
          <div className="flex-shrink-0">
            <Link href="/" className="text-3xl font-light text-gray-900 transition-colors duration-150 text-black/70 hover:text-black dark:text-gray-300 dark:hover:text-white">
              calisera
            </Link>
          </div>
          
          {/* Navigation */}
          <nav className="flex space-x-8">
            <Link 
              href="/" 
              className="text-black px-3 py-2 text-sm transition-colors duration-150 text-black/70 hover:text-black dark:text-gray-300 dark:hover:text-white"
            >
              Project
            </Link>
            <Link 
              href="/blog" 
              className="text-black px-3 py-2 text-sm transition-colors duration-150 text-black/70 hover:text-black dark:text-gray-300 dark:hover:text-white"
            >
              Blog
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}