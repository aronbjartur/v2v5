import { getNewsArticle } from '../contentful';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { Document } from '@contentful/rich-text-types';

interface ArticleProps {
  searchParams: { slug?: string };
}

export default async function ArticlePage({ searchParams }: ArticleProps) {
  const { slug } = searchParams;
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