import type { Metadata } from 'next';
import { DM_Serif_Display, DM_Sans, Geist_Mono } from 'next/font/google';
import { Nav } from '@/components/Nav/Nav';
import { Cursor } from '@/components/Cursor/Cursor';
import './globals.css';

const dmSerifDisplay = DM_Serif_Display({
  variable: '--font-dm-serif-display',
  subsets: ['latin'],
  weight: '400',
  display: 'swap',
});

const dmSans = DM_Sans({
  variable: '--font-dm-sans',
  subsets: ['latin'],
  display: 'swap',
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Caleb Zearing',
  description: 'Software Engineer at Microsoft. Building UI, making music, writing.',
  openGraph: {
    title: 'Caleb Zearing',
    description: 'Software Engineer at Microsoft',
    url: 'https://www.czearing.com',
    siteName: 'Caleb Zearing',
    locale: 'en_US',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${dmSerifDisplay.variable} ${dmSans.variable} ${geistMono.variable}`}
    >
      <body>
        <Cursor />
<Nav />
        <main>{children}</main>
      </body>
    </html>
  );
}
