import './globals.scss';

export const metadata = {
  title: 'Next.js CMS Project',
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
            <a href="/">Heim</a>
            <a href="/news">Fréttir</a>
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