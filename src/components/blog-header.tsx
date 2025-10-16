export function BlogHeader() {
	return (
		<div className="max-w-4xl">
			<h1 className="text-[42px] md:text-[64px] font-medium mb-4 text-[#111827] dark:text-white leading-[1.1] md:leading-[1.06]">
				Building Calisera from Scratch
			</h1>
			<p className="text-[18px] text-[#404551] font-regular dark:text-gray-300 max-w-3xl mb-8 leading-relaxed">
				{`From user interviews to MVP — showcasing product management insights, development decisions, user interface design and technical architecture behind our appointment booking app.`}
			</p>
		</div>
	);
}
