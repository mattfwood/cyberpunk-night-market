'use client';

import { useEffect, useState } from 'react';
import qs from 'qs';
import QRCode from 'qrcode';

import Item, { ItemForm } from './Item';
import { ShareModal } from './ShareModal';

export type ItemType = {
  name: string;
  company?: string;
  description: string;
  price: number;
  category: string;
  quantity: number;
};

const defaultItems = [
  {
    name: 'Gun',
    company: 'Arasaka',
    description: 'This is item 1',
    price: 100,
    category: 'weapons',
    quantity: 0,
  },
] as ItemType[];

export default function Home() {
  const [items, setItems] = useState<ItemType[]>(defaultItems);

  const groupedItems = items.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = [];
    }
    acc[item.category].push(item);
    return acc;
  }, {} as { [key: string]: ItemType[] });

  const updateItemQuantity = (item: ItemType, quantity: number) => {
    const newItems = items.map((i) => {
      if (i.name === item.name) {
        return { ...i, quantity };
      }
      return i;
    });
    setItems(newItems);
  };

  const total = items.reduce((acc, item) => {
    return acc + item.price * item.quantity;
  }, 0);

  // load items from query string
  useEffect(() => {
    const query = qs.parse(window.location.search, {
      ignoreQueryPrefix: true,
    }) as unknown;
    console.log(query);
    const { items } = query as { items: ItemType[] };
    if (items && items?.length) {
      setItems(items as ItemType[]);
    }
  }, []);

  // persist items in query string
  useEffect(() => {
    const query = qs.stringify({ items });
    window.history.replaceState({}, '', `/?${query}`);
  }, [items]);

  return (
    <div>
      <div className="flex justify-center px-2">
        <main className="w-full max-w-2xl py-2">
          <ShareModal />
          {Object.entries(groupedItems).map(([category, items]) => (
            <div key={category}>
              <h2 className="text-3xl font-bold capitalize">{category}</h2>
              {items.map((item) => (
                <Item
                  item={item}
                  updateItemQuantity={updateItemQuantity}
                  key={item.name}
                />
              ))}
            </div>
          ))}
          <div className="flex justify-end">
            <h2 className="text-2xl font-bold">Total: €{total}</h2>
          </div>
          <ItemForm
            onSubmit={(newItem) => setItems((prev) => [...prev, newItem])}
          />
        </main>
      </div>
    </div>
  );
}
