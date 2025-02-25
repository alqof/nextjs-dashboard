import '@/app/ui/global.css';
import { inter } from '@/app/ui/fonts';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Acme',
  description: 'The official Next.js Course Dashboard, built with App Router.',
  metadataBase: new URL('https://nextjs-dashboard-nine-chi.vercel.app/'),
  icons: {
    icon: '/engineerman.png', // Main Favicon
    shortcut: '/engineerman.png',
    apple: '/apple-icon.png', // Apple Icon
    other: [{
      rel: 'icon',
      url: '/engineerman.png', // Aplication Icon
    }]
  }
};

export default function RootLayout({children} : {children: React.ReactNode}){
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>{children}</body>
    </html>
  );
}
