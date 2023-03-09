import localFont from 'next/font/local';
import './globals.css';

const mainFont = localFont({ src: '../BlenderPro-Medium.woff2' });

export const metadata = {
  title: 'Night Market Creator',
  description: 'Create your own Cyberpunk Night Market',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={mainFont.className}>
        <div className="bg-secondary min-h-screen text-white">{children}</div>
      </body>
    </html>
  );
}
