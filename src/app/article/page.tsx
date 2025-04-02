import { getNewsArticle } from '../contentful';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';

interface ArticleProps {
  searchParams: { slug?: string };
}

export default async function ArticlePage({ searchParams }: ArticleProps) {
  const { slug } = searchParams;
  if (!slug) {
    return <p>enginn grein valin</p>;
  }

  const article = await getNewsArticle(slug as string);
  if (!article) {
    return <p>grein ekki fundinn</p>;
  }

  return (
    <main>
      <h1>{article.title}</h1>
      {documentToReactComponents(article.text)}
    </main>
  );
}