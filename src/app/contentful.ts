import { createClient, EntryCollection, Entry } from 'contentful';
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
  const entries: EntryCollection<HomepageFields> = await client.getEntries<HomepageFields>({
    content_type: 'homepage',
  });

  return entries.items.map((item: Entry<HomepageFields>) => ({
    title: item.fields.title,
    text: item.fields.text,
  }));
}

export async function getNewsArticles(): Promise<{ slug: string; title: string; excerpt: string }[]> {
  const entries: EntryCollection<NewsArticleFields> = await client.getEntries<NewsArticleFields>({
    content_type: 'newsArticle',
  });

  return entries.items.map((item: Entry<NewsArticleFields>) => ({
    slug: item.fields.slug,
    title: item.fields.title,
    excerpt: item.fields.excerpt,
  }));
}

export async function getNewsArticle(slug: string): Promise<{ title: string; text: Document } | null> {
  const entries: EntryCollection<NewsArticleFields> = await client.getEntries<NewsArticleFields>({
    content_type: 'newsArticle',
    'fields.slug': slug,
  });

  if (entries.items.length > 0) {
    return {
      title: entries.items[0].fields.title,
      text: entries.items[0].fields.text,
    };
  }
  return null;
}