import { createClient, EntrySkeletonType, EntryFieldTypes } from 'contentful';
import { Document } from '@contentful/rich-text-types';

interface HomepageSkeleton extends EntrySkeletonType {
  contentTypeId: 'homepage'; 
  fields: {
    title: EntryFieldTypes.Symbol; 
    text: EntryFieldTypes.RichText; 
  };
}

interface NewsArticleSkeleton extends EntrySkeletonType {
  contentTypeId: 'newsArticle'; 
  fields: {
    slug: EntryFieldTypes.Symbol;
    title: EntryFieldTypes.Symbol;
    excerpt: EntryFieldTypes.Text; 
    text: EntryFieldTypes.RichText;
  };
}

const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID!,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN!,
});

export async function getHomepageData(): Promise<{ title: string; text: Document }[]> {
  const entries = await client.getEntries<HomepageSkeleton>({
    content_type: 'homepage',
  });

  return entries.items.map(item => ({
    title: item.fields.title,
    text: item.fields.text,
  }));
}

export async function getNewsArticles(): Promise<{ slug: string; title: string; excerpt: string }[]> {
  const entries = await client.getEntries<NewsArticleSkeleton>({
    content_type: 'newsArticle',
    order: ['-sys.createdAt'] 
  });

  return entries.items.map(item => ({
    slug: item.fields.slug,
    title: item.fields.title,
    excerpt: item.fields.excerpt,
  }));
}

export async function getNewsArticle(slug: string): Promise<{ title: string; text: Document } | null> {
  const entries = await client.getEntries<NewsArticleSkeleton>({
    content_type: 'newsArticle',
    'fields.slug': slug,
    limit: 1, 
  });

  if (entries.items.length > 0) {
    const item = entries.items[0];
    return {
      title: item.fields.title,
      text: item.fields.text,
    };
  }
  return null;
}