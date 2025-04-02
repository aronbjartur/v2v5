import { createClient } from 'contentful';

const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID!,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN!,
});

export async function getHomepageData() {
  const entries = await client.getEntries({
    content_type: 'homepage',
  });

  return entries.items.map((item: any) => ({
    title: item.fields.title,
    text: item.fields.text,
  }));
}

export async function getNewsArticles() {
  const entries = await client.getEntries({
    content_type: 'newsArticle',
  });

  return entries.items.map((item: any) => ({
    slug: item.fields.slug,
    title: item.fields.title,
    excerpt: item.fields.excerpt,
  }));
}

export async function getNewsArticle(slug: string) {
  const entries = await client.getEntries({
    content_type: 'newsArticle',
    'fields.slug': slug,
  });

  if (entries.items.length > 0) {
    return entries.items[0].fields as { title: string; text: string };
  }
  return null;
}