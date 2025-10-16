import {
	CoreFeaturesGrid,
	FeaturedPostCard,
	GradientBackground,
} from '@/components';
import Image from 'next/image';
import { getOrderedPosts } from '../../lib/posts';

const heroGradients = {
	light: [
		{
			left: '25%',
			top: '45%',
			width: '600px',
			height: '600px',
			color: '#FABD8F',
			opacity: '0.35',
			blur: '80px',
			rotate: '25deg',
		},
		{
			left: '65%',
			top: '55%',
			width: '500px',
			height: '500px',
			color: '#FFA726',
			opacity: '0.35',
			blur: '80px',
			rotate: '-15deg',
		},
		{
			left: '50%',
			top: '50%',
			width: '400px',
			height: '400px',
			color: '#FABD8F',
			opacity: '0.25',
			blur: '60px',
			rotate: '45deg',
		},
	],
	dark: [
		{
			left: '35%',
			top: '45%',
			width: '600px',
			height: '600px',
			color: '#FABD8F',
			opacity: '0.35',
			blur: '80px',
			rotate: '25deg',
		},
		{
			left: '65%',
			top: '55%',
			width: '500px',
			height: '500px',
			color: '#FF9800',
			opacity: '0.35',
			blur: '80px',
			rotate: '-15deg',
		},
		{
			left: '50%',
			top: '50%',
			width: '400px',
			height: '400px',
			color: '#FABD8F',
			opacity: '0.25',
			blur: '60px',
			rotate: '45deg',
		},
	],
};

const visionGradients = {
	light: [
		{
			left: '40%',
			top: '30%',
			width: '500px',
			height: '500px',
			color: '#0AB8DC',
			opacity: '0.20',
			blur: '100px',
			rotate: '30deg',
		},
		{
			left: '60%',
			top: '35%',
			width: '450px',
			height: '450px',
			color: '#67E8F9',
			opacity: '0.20',
			blur: '100px',
			rotate: '-20deg',
		},
		{
			left: '50%',
			top: '25%',
			width: '350px',
			height: '350px',
			color: '#0AB8DC',
			opacity: '0.15',
			blur: '80px',
			rotate: '60deg',
		},
	],
	dark: [
		{
			left: '40%',
			top: '30%',
			width: '500px',
			height: '500px',
			color: '#FABD8F',
			opacity: '0.20',
			blur: '100px',
			rotate: '30deg',
		},
		{
			left: '60%',
			top: '35%',
			width: '450px',
			height: '450px',
			color: '#FABD8F',
			opacity: '0.20',
			blur: '100px',
			rotate: '-20deg',
		},
		{
			left: '50%',
			top: '25%',
			width: '350px',
			height: '350px',
			color: '#FABD8F',
			opacity: '0.15',
			blur: '80px',
			rotate: '60deg',
		},
	],
};

const techGradients = {
	light: [
		{
			left: '25%',
			top: '35%',
			width: '550px',
			height: '550px',
			color: '#E34290',
			opacity: '0.30',
			blur: '90px',
			rotate: '15deg',
		},
		{
			left: '75%',
			top: '65%',
			width: '550px',
			height: '550px',
			color: '#F472B6',
			opacity: '0.30',
			blur: '90px',
			rotate: '-30deg',
		},
		{
			left: '55%',
			top: '45%',
			width: '400px',
			height: '400px',
			color: '#E34290',
			opacity: '0.25',
			blur: '70px',
			rotate: '75deg',
		},
	],
	dark: [
		{
			left: '25%',
			top: '15%',
			width: '550px',
			height: '550px',
			color: '#E34290',
			opacity: '0.30',
			blur: '90px',
			rotate: '15deg',
		},
		{
			left: '75%',
			top: '25%',
			width: '550px',
			height: '550px',
			color: '#F472B6',
			opacity: '0.30',
			blur: '90px',
			rotate: '-30deg',
		},
		{
			left: '55%',
			top: '35%',
			width: '400px',
			height: '400px',
			color: '#E34290',
			opacity: '0.25',
			blur: '70px',
			rotate: '75deg',
		},
	],
};
const Badge = ({ children }: { children: React.ReactNode }) => (
	<div
		className="inline-flex items-center gap-2 px-6 py-2 rounded-full
    ring-1 ring-inset ring-white dark:ring-[#FFFFFFCC]
    shadow-[0_4px_8px_0_rgba(0,0,0,0.05)]
    text-black dark:text-[#FAFAFA] text-sm mb-6
    bg-[#ffffff50] dark:bg-[#11182773]
    backdrop-blur-[30px]"
	>
		{children}
	</div>
);

export default function AboutPage() {
	const { featuredPost } = getOrderedPosts();

	return (
		<>
			{/* Hero Section */}
			<section
				className="relative py-16 overflow-x-clip"
				aria-labelledby="hero-heading"
			>
				<GradientBackground
					lightOrbs={heroGradients.light}
					darkOrbs={heroGradients.dark}
				/>

				<div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="max-w-5xl">
						<Badge>About the Project</Badge>
						<h1
							id="hero-heading"
							className="text-[42px] md:text-[52px] font-medium mb-8 text-[#111827] dark:text-white leading-[1.1]"
						>
							Building the appointment booking app for Instagram
							professionals
						</h1>
						<p className="text-lg text-[#404551] dark:text-gray-300 max-w-5xl mb-8">
							<strong className="text-medium">
								Calisera is our hands-on learning project.
							</strong>{' '}
							{`We're building a complete appointment booking application from the
              ground up — tackling architecture decisions, API design, user
              interface development, and deployment. We chose to focus on
              Instagram-based service providers because it presents real
              technical challenges: mobile-first design, social platform
              integration, and real-time scheduling systems.`}
						</p>
						<p className="text-lg text-[#404551] dark:text-gray-300 max-w-5xl">
							<strong className="text-medium">
								This blog documents our key product decisions.
							</strong>{' '}
							{`As we work through building Calisera, we write about the important
              choices we make: why we chose our tech stack, how we approached
              major features, what architecture patterns we implemented, and
              which solutions worked (or didn't). These aren't daily
              logs — they're reflections on the significant development milestones
              and lessons learned along the way.`}
						</p>
					</div>
				</div>
			</section>

			{/* Vision & Features Section */}
			<section
				className="relative py-16 overflow-x-clip"
				aria-labelledby="vision-heading"
			>
				<GradientBackground
					lightOrbs={visionGradients.light}
					darkOrbs={visionGradients.dark}
				/>

				<div className="relative z-10 max-w-7xl mx-auto text-center pb-16">
					<Badge>The Problem Space</Badge>
					<h2
						id="vision-heading"
						className="text-4xl md:text-5xl font-medium text-[#111827] dark:text-white mb-8 max-w-5xl mx-auto leading-[1.1]"
					>
						Building for mobile-first professionals
					</h2>
					<div className="relative z-10 max-w-7xl mx-auto text-center pb-16">
						<p className="text-lg text-[#404551] dark:text-gray-300 max-w-5xl mx-auto px-4 mb-6">
							Many service providers today — hairstylists,
							personal trainers, freelancers — run their entire
							business through Instagram. They showcase work,
							engage clients, and handle inquiries all through
							social media. But existing booking tools assume you
							have a traditional website and desktop workflow.
						</p>
						<p className="text-lg text-[#404551] dark:text-gray-300 max-w-5xl mx-auto px-4">
							This gap creates interesting product challenges: How
							do you build scheduling that works seamlessly on
							mobile? How do you integrate with social platforms?
							How do you design for users who may never visit a
							traditional website? These questions drive our
							development decisions, and we document our approach
							in the blog.
						</p>
					</div>
				</div>

				<div className="relative z-10 max-w-7xl mx-auto text-center pt-16 px-4">
					<Badge>What We Are Building</Badge>
					<h2
						id="features-heading"
						className="text-4xl md:text-5xl font-medium text-[#111827] dark:text-white mb-4"
					>
						Core Features
					</h2>
					<p className="text-lg text-[#404551] dark:text-gray-300 mb-12">
						{`Traditional booking platforms assume you have a website and
            desktop-focused business, but today's entrepreneurs are
            mobile-native and Instagram-first. We're developing Calisera to
            bridge this gap with features designed for your actual workflow.
            Here are the key features we're building:`}
					</p>
					<CoreFeaturesGrid />
				</div>
			</section>

			{/* Tech Stack & Team Section */}
			<section
				className="relative py-16 overflow-x-clip"
				aria-labelledby="tech-heading"
			>
				<GradientBackground
					lightOrbs={techGradients.light}
					darkOrbs={techGradients.dark}
				/>

				<div className="relative z-10 max-w-7xl mx-auto text-center px-4">
					<Badge>How</Badge>
					<h2
						id="tech-heading"
						className="text-4xl md:text-5xl font-medium text-[#111827] dark:text-white mb-16 max-w-5xl mx-auto leading-[1.1]"
					>
						Our Tech Stack
					</h2>

					<div className="flex justify-center items-center flex-wrap gap-16 mb-32 max-w-3xl mx-auto text-center">
						<Image
							src="/images/logos/React-icon.svg"
							alt="React"
							width={128}
							height={128}
							className="h-24 md:h-32 w-auto"
						/>
						<Image
							src="/images/logos/Nx.svg"
							alt="Nx"
							width={128}
							height={128}
							className="h-24 md:h-32 w-auto"
						/>
						<Image
							src="/images/logos/NestJS.svg"
							alt="NestJS"
							width={128}
							height={128}
							className="h-24 md:h-32 w-auto"
						/>
						<Image
							src="/images/logos/Amazon_Web_Services_Logo.svg"
							alt="Amazon Web Services"
							width={128}
							height={128}
							className="h-20 w-auto"
						/>
						<Image
							src="/images/logos/next.svg"
							alt="Next.js"
							width={128}
							height={128}
							className="h-10 w-auto"
						/>
					</div>

					<Badge>Who We Are</Badge>
					<h2
						id="team-heading"
						className="text-4xl md:text-5xl font-medium text-[#111827] dark:text-white mb-16 max-w-5xl mx-auto leading-[1.1]"
					>
						Meet the Team
					</h2>

					<div className="flex flex-wrap justify-center gap-8">
						<article className="flex-1 min-w-[320px] max-w-[460px] rounded-[32px] border border-[#E4E4E4] dark:border-[#404551] bg-white dark:bg-[#111827] p-6 md:p-8 text-left shadow-none transition-shadow hover:shadow-[0_6px_24px_rgba(0,0,0,0.06)]">
							<Image
								src="/images/people/marcus_anime_cropped2.png"
								alt="Marcus, Tech Lead"
								width={240}
								height={542}
								className="w-[calc(100%-4rem)] h-52 md:h-78 mb-6 rounded-2xl object-cover object-center mx-auto"
							/>
							<h3 className="text-2xl text-center font-medium mb-2 text-gray-900 dark:text-white">
								Marcus
								<br />
								Tech Lead
							</h3>
							<p className="text-gray-600 dark:text-gray-300">
								{`Marcus is Calisera's Lead Developer with over 20 years of
                experience. He drives technical decision-making and has
                architected our secure infrastructure, ensuring
                Calisera delivers exceptional performance on a scalable, secure
                foundation.`}
							</p>
						</article>

						<article className="flex-1 min-w-[320px] max-w-[460px] rounded-[32px] border border-[#E4E4E4] dark:border-[#404551] bg-white dark:bg-[#111827] p-6 md:p-8 text-left shadow-none transition-shadow hover:shadow-[0_6px_24px_rgba(0,0,0,0.06)]">
							<Image
								src="/images/people/sab_anime_grey_cropped.png"
								alt="Sabine, Developer and Project Manager"
								width={600}
								height={400}
								className="w-[calc(100%-4rem)] h-52 md:h-78 mb-6 rounded-2xl object-cover object-center mx-auto"
							/>
							<h3 className="text-2xl text-center font-medium mb-2 text-gray-900 dark:text-white">
								Sabine
								<br />
								Developer & Product Owner
							</h3>
							<p className="text-gray-600 dark:text-gray-300">
								Sabine is a full-stack developer with a passion
								for design. Working across the entire product,
								she not only builds beautiful, functional
								experiences but also drives projects forward
								through strategic planning turning vision into
								reality.
							</p>
						</article>
					</div>
				</div>
			</section>

			{/* Latest Articles Section */}
			{featuredPost && (
				<section aria-labelledby="articles-heading" className="py-16">
					<div className="max-w-7xl mx-auto text-center px-4">
						<h2
							id="articles-heading"
							className="text-3xl font-medium text-[#111827] dark:text-white mb-8"
						>
							Latest Articles
						</h2>
						<FeaturedPostCard post={featuredPost} />
					</div>
				</section>
			)}
		</>
	);
}
