import { Footer, Header } from '@/components';
import type { Metadata } from 'next';
import { Inter_Tight, JetBrains_Mono } from 'next/font/google';
import './globals.css';

const interTight = Inter_Tight({
	subsets: ['latin'],
	variable: '--font-sans',
});

const jetBrainsMono = JetBrains_Mono({
	subsets: ['latin'],
	variable: '--font-mono',
	weight: ['400', '700'],
});

export const metadata: Metadata = {
	title: 'Calisera Blog',
	description: 'A mobile-first appointment management app',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body
				className={`${interTight.variable} ${jetBrainsMono.variable} antialiased`}
			>
				<Header />
				{children}
				<Footer />
			</body>
		</html>
	);
}
