import Link from 'next/link';
import { getNewsArticles } from '../contentful';

export default async function NewsList() {
  const articles = await getNewsArticles();

  return (
    <main>
      <h1>Fréttir</h1>
      <ul>
        {articles.map((article: { slug: string; title: string; excerpt: string }) => (
          <li key={article.slug}>
            <Link href={`/article?slug=${article.slug}`}>
              {article.title}
            </Link>
            <p>{article.excerpt}</p>
          </li>
        ))}
      </ul>
    </main>
  );
}