import Link from "next/link";
import { getAllTags, getOrderedPosts } from "../../lib/posts";
import BlogHeader from "@/components/BlogHeader";
import TagsFilter from "@/components/TagsFilter";
import FeaturedPostCard from "@/components/FeaturedPostCard";
import RegularPostCard from "@/components/RegularPostCard";
import GradientBackground from "@/components/GradientBackground";

interface BlogPageProps {
  searchParams: { tag?: string };
}

const blogGradients = {
  light: [
    {
      left: "40%",
      top: "30%",
      width: "500px",
      height: "500px",
      color: "#0AB8DC",
      opacity: "0.20",
      blur: "100px",
      rotate: "30deg",
    },
    {
      left: "60%",
      top: "35%",
      width: "450px",
      height: "450px",
      color: "#67E8F9",
      opacity: "0.20",
      blur: "100px",
      rotate: "-20deg",
    },
    {
      left: "50%",
      top: "25%",
      width: "350px",
      height: "350px",
      color: "#0AB8DC",
      opacity: "0.15",
      blur: "80px",
      rotate: "60deg",
    },
  ],
  dark: [
    {
      left: "40%",
      top: "30%",
      width: "500px",
      height: "500px",
      color: "#FABD8F",
      opacity: "0.20",
      blur: "100px",
      rotate: "30deg",
    },
    {
      left: "60%",
      top: "35%",
      width: "450px",
      height: "450px",
      color: "#FABD8F",
      opacity: "0.20",
      blur: "100px",
      rotate: "-20deg",
    },
    {
      left: "50%",
      top: "25%",
      width: "350px",
      height: "350px",
      color: "#FABD8F",
      opacity: "0.15",
      blur: "80px",
      rotate: "60deg",
    },
  ],
};

export default function BlogPage({ searchParams }: BlogPageProps) {
  const { tag } = searchParams;
  const tags = getAllTags();
  const { featuredPost, regularPosts, totalCount } = getOrderedPosts(tag);

  return (
    <div className="relative overflow-x-clip">
      {/* Gradient Background */}
      <GradientBackground lightOrbs={blogGradients.light} darkOrbs={blogGradients.dark} />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8 lg:pt-16 lg:pb-8">
        <main>
          <BlogHeader />

          {/* Tags Navigation */}
          <nav aria-label="Blog categories" role="navigation">
            <TagsFilter tags={tags} />
          </nav>

          {/* Current Filter Indicator */}
          {tag && (
            <div className="mb-8" role="status" aria-live="polite">
              <p className="text-gray-600 dark:text-gray-300">
                <span className="sr-only">Currently showing: </span>
                Filtered by <strong>"{tag}"</strong> - {totalCount} article{totalCount !== 1 ? 's' : ''} found
              </p>
            </div>
          )}

          {/* Featured Article Section */}
          {featuredPost && regularPosts.length > 0 && (
            <section aria-labelledby="featured-heading">
              <h2 
                id="featured-heading"
                className="text-3xl my-8 text-black dark:text-white pt-8 pb-4"
              >
                Featured Article
              </h2>
              <FeaturedPostCard post={featuredPost} />
            </section>
          )}

          {/* Regular Articles Section */}
          {regularPosts.length > 0 && (
            <section aria-labelledby="articles-heading">
              <h2 
                id="articles-heading"
                className="text-3xl mt-16 mb-8 pt-8 pb-4 text-black dark:text-white"
              >
                {tag ? `More ${tag} Articles` : 'More Articles'}
              </h2>

              <div 
                className="grid grid-cols-1 md:grid-cols-2 gap-8"
                role="list"
                aria-label={`Blog articles${tag ? ` tagged with ${tag}` : ''}`}
              >
                {regularPosts.map((post) => (
                  <div key={post.slug} role="listitem">
                    <RegularPostCard post={post} />
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* No Results State */}
          {regularPosts.length === 0 && !featuredPost && (
            <section 
              className="text-center py-16"
              role="status"
              aria-live="polite"
            >
              <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
                No articles found
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-8">
                {tag 
                  ? `No articles found for the tag "${tag}". Try browsing other categories or view all articles.`
                  : "No articles available at the moment."
                }
              </p>
              {tag && (
                <Link 
                  href="/blog" 
                  className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  aria-label="View all blog articles"
                >
                  View All Articles
                </Link>
              )}
            </section>
          )}
        </main>
      </div>
    </div>
  );
}