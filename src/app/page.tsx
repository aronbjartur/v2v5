import { getHomepageData } from './contentful';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { Document } from '@contentful/rich-text-types';

export default async function HomePage() {
  const homepageEntries = await getHomepageData();

  return (
    <main>
      {homepageEntries.map((entry: { title: string; text: Document }, index: number) => (
        <section key={index}>
          <h1>{entry.title}</h1>
          <div>{documentToReactComponents(entry.text)}</div>
        </section>
      ))}
    </main>
  );
}