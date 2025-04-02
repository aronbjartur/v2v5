import { createClient, Entry, EntryCollection } from 'contentful';
import { Document } from '@contentful/rich-text-types';

interface HomepageFields {
  title: string;
  text: Document;
}

interface NewsArticleFields {
  slug: string;
  title: string;
  excerpt: string;
  text: Document;
}

const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID!,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN!,
});

export async function getHomepageData(): Promise<{ title: string; text: Document }[]> {
  const entries = await client.getEntries({ content_type: 'homepage' });
  return (entries.items as Entry<HomepageFields>[]).map(item => ({
    title: item.fields.title,
    text: item.fields.text,
  }));
}

export async function getNewsArticles(): Promise<{ slug: string; title: string; excerpt: string }[]> {
  const entries = await client.getEntries({ content_type: 'newsArticle' });
  return (entries.items as Entry<NewsArticleFields>[]).map(item => ({
    slug: item.fields.slug,
    title: item.fields.title,
    excerpt: item.fields.excerpt,
  }));
}

export async function getNewsArticle(slug: string): Promise<{ title: string; text: Document } | null> {
  const entries = await client.getEntries({
    content_type: 'newsArticle',
    'fields.slug': slug,
  });
  const items = entries.items as Entry<NewsArticleFields>[];
  if (items.length > 0) {
    return {
      title: items[0].fields.title,
      text: items[0].fields.text,
    };
  }
  return null;
}