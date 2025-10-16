import { getAllTags, getOrderedPosts } from "../lib/posts";
import BlogHeader from "@/components/BlogHeader";
import TagsFilter from "@/components/TagsFilter";
import FeaturedPostCard from "@/components/FeaturedPostCard";
import RegularPostCard from "@/components/RegularPostCard";
import GradientBackground from "@/components/GradientBackground";

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

export default function HomePage() {
  const tags = getAllTags();
  const { featuredPost, regularPosts } = getOrderedPosts();

  return (
    <div className="relative overflow-x-clip">
      <GradientBackground lightOrbs={blogGradients.light} darkOrbs={blogGradients.dark} />
      <div className="relative z-10 max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8 lg:pt-16 lg:pb-8">
        <main>
          <BlogHeader />
          <nav aria-label="Blog categories" role="navigation">
            <TagsFilter tags={tags} />
          </nav>
          {featuredPost && (
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
          {regularPosts.length > 0 && (
            <section aria-labelledby="articles-heading">
              <h2
                id="articles-heading"
                className="text-3xl mt-16 mb-8 pt-8 pb-4 text-black dark:text-white"
              >
                More Articles
              </h2>
              <div
                className="grid grid-cols-1 md:grid-cols-2 gap-8"
                role="list"
                aria-label={`Blog articles`}
              >
                {regularPosts.map((post) => (
                  <div key={post.slug} role="listitem">
                    <RegularPostCard post={post} />
                  </div>
                ))}
              </div>
            </section>
          )}
        </main>
      </div>
    </div>
  );
}
