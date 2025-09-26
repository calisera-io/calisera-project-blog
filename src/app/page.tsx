import Link from "next/link";
import Image from "next/image";
import { getOrderedPosts } from "../lib/posts";
import FeaturedPostCard from "@/components/FeaturedPostCard";
import CoreFeaturesGrid from "@/components/CoreFeaturesGrid";

export default function HomePage() {
  const { featuredPost } = getOrderedPosts(); // Show latest 3 posts

  return (
    <>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <section className="max-w-4xl lg:pt-16 lg:pb-8">
          <h1 className="text-[42px] md:text-[64px] font-medium mb-4 text-[#111827] dark:text-white leading-[1.1] md:leading-[1.06]">
            About the Project
          </h1>
          <p className="text-[18px] text-[#404551] font-regular dark:text-gray-300 max-w-3xl mb-8 leading-relaxed">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </p>
        </section>
        <section
          className="max-w-7xl lg:pb-16"
          aria-labelledby="core-features"
        >
          <h2
            id="core-features"
            className="text-center mb-12 text-[32px] md:text-[48px] font-medium leading-[1.1] md:leading-[1.06] text-[#111827] dark:text-white my-32"
          >
            Core Featues Planned
          </h2>
          <div>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </div>
          <CoreFeaturesGrid />
        </section>
        <section className="min-h-[calc(100vh-6rem)] flex flex-col justify-center" aria-labelledby="featured-heading">
          <h2
            id="featured-heading"
            className="text-4xl text-center  my-8 text-black dark:text-white pt-8 pb-4"
          >
            Our Tech Stack
          </h2>
          <div className="flex justify-center items-center">
          <div className="relative w-3xl z-10 flex gap-8">
            <div className="w-full h-24 md:h-32 mb-6 overflow-hidden rounded-full">
                <Image
                  src="https://picsum.photos/800/400"
                  alt="Marcus"
                  width={600}
                  height={800}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="w-full h-24 md:h-32 mb-6 overflow-hidden rounded-full">
                <Image
                  src="https://picsum.photos/800/400"
                  alt="Marcus"
                  width={600}
                  height={800}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="w-full h-24 md:h-32 mb-6 overflow-hidden rounded-full">
                <Image
                  src="https://picsum.photos/800/400"
                  alt="Marcus"
                  width={600}
                  height={800}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="w-full h-24 md:h-32 mb-6 overflow-hidden rounded-full">
                <Image
                  src="https://picsum.photos/800/400"
                  alt="Marcus"
                  width={600}
                  height={800}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="w-full h-24 md:h-32 mb-6 overflow-hidden rounded-full">
                <Image
                  src="https://picsum.photos/800/400"
                  alt="Marcus"
                  width={600}
                  height={800}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="w-full h-24 md:h-32 mb-6 overflow-hidden rounded-full">
                <Image
                  src="https://picsum.photos/800/400"
                  alt="Marcus"
                  width={600}
                  height={800}
                  className="w-full h-full object-cover"
                />
              </div>
          </div>
          </div>
          <h2
            id="team-heading"
            className="text-4xl text-center my-8 text-black dark:text-white pt-8 pb-4"
          >
            Meet the Team
          </h2>
          <div>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </div>
          <div
            className="grid grid-cols-1 md:grid-cols-2 gap-8 p-16"
            aria-label={`Team Marcus`}
          >
            {/* Featured Image */}
            <div className="w-full rounded-[32px] border border-[#E4E4E4] dark:border-[#404551] bg-white dark:bg-[#111827] p-6 md:p-8 text-left shadow-none transition-shadow hover:shadow-[0_6px_24px_rgba(0,0,0,0.06)] max-w-none ">
              <div className="w-full h-48 md:h-64 mb-6 overflow-hidden rounded-2xl">
                <Image
                  src="https://picsum.photos/800/400"
                  alt="Marcus"
                  width={600}
                  height={800}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-2xl text-center font-medium mb-2 text-gray-900 dark:text-white">
                Marcus <br />
                Tech Lead
              </h3>

              {/* Excerpt */}
              <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat.
              </p>
            </div>

            {/* Featured Image */}
            <div className="w-full rounded-[32px] border border-[#E4E4E4] dark:border-[#404551] bg-white dark:bg-[#111827] p-6 md:p-8 text-left shadow-none transition-shadow hover:shadow-[0_6px_24px_rgba(0,0,0,0.06)] max-w-none ">
              <div className="w-full h-48 md:h-64 mb-6 overflow-hidden rounded-2xl">
                <Image
                  src="https://picsum.photos/800/400"
                  alt="Marcus"
                  width={600}
                  height={800}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-2xl text-center font-medium mb-2 text-gray-900 dark:text-white">
                Sabine <br />
                Developer & Product-Manager
              </h3>

              {/* Excerpt */}
              <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat.
              </p>
            </div>
          </div>
        </section>

        <section aria-labelledby="featured-heading">
          {/* Featured Article Section */}
          {featuredPost && (
            <section aria-labelledby="featured-heading">
              <h2
                id="featured-heading"
                className="text-3xl my-8 text-black dark:text-white pt-8 pb-4"
              >
                Latest Articles
              </h2>
              <FeaturedPostCard post={featuredPost} />
            </section>
          )}
        </section>
      </div>
    </>
  );
}
