import Link from 'next/link';
import './globals.scss';

export const metadata = {
  title: 'frettasidan',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <header>
          <h1>fréttasíðan</h1>
          <nav>
            <Link href="/">Heim</Link>
            <Link href="/news">Fréttir</Link>
          </nav>
        </header>
        {children}
        <footer>
          <p>© 2025 Aron B</p>
        </footer>
      </body>
    </html>
  );
}