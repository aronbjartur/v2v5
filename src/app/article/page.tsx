import { getNewsArticle } from '../contentful';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';

interface ArticleProps {
  searchParams: Promise<{ slug?: string }>;
}

export default async function ArticlePage({ searchParams }: ArticleProps) {
  const { slug } = await searchParams;
  if (!slug) {
    return <p>enginn grein valin</p>;
  }

  const article = await getNewsArticle(slug);
  if (!article) {
    return <p>grein ekki fundin</p>;
  }

  return (
    <main>
      <h1>{article.title}</h1>
      <div>{documentToReactComponents(article.text)}</div>
    </main>
  );
}