import Item from './Item';

export type ItemType = {
  name: string;
  company?: string;
  description: string;
  price: number;
} & { [key: string]: string };

const items = [
  {
    name: 'Item 1',
    company: 'Arasaka',
    description: 'This is item 1',
    price: 100,
  },
] as ItemType[];

export default function Home() {
  return (
    <div className="flex justify-center">
      <main className="w-full max-w-2xl">
        {items.map((item) => (
          <Item item={item} key={item.name} />
        ))}
      </main>
    </div>
  );
}
