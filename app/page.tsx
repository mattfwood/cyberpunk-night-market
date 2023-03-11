'use client';

import { useEffect, useState } from 'react';
import qs from 'qs';

import Item, { ItemForm } from './Item';
import { ShareModal } from './ShareModal';

export type ItemType = {
  name: string;
  company?: string;
  description: string;
  price: number;
  category: string;
  quantity: number;
} & { [key: string]: string | number };

const defaultItems = [
  {
    name: 'Very Heavy Pistol',
    company: '',
    description: '',
    price: 100,
    category: 'weapons',
    quantity: 0,
    skill: 'Handgun',
    singleShotDamage: '4d6',
    rateOfFire: '1',
  },
] as ItemType[];

export default function Home() {
  const [items, setItems] = useState<ItemType[]>(defaultItems);

  const groupedItems = items.reduce((acc, item) => {
    const category = item.category.toLowerCase();
    if (!acc[category]) {
      acc[category] = [];
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

  const removeItem = (item: ItemType) => {
    const newItems = items.filter((i) => i.name !== item.name);
    setItems(newItems);
  };

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

  // find total
  const total = items.reduce((acc, item) => {
    return acc + item.price * item.quantity;
  }, 0);

  // format total without cents
  const formattedTotal = total
    .toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    })
    .replace('$', '');

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
                  key={item.name}
                  item={item}
                  updateItemQuantity={updateItemQuantity}
                  removeItem={removeItem}
                />
              ))}
            </div>
          ))}
          <div className="flex justify-end">
            <h2 className="text-2xl font-bold">Total: €{formattedTotal}</h2>
          </div>
          <ItemForm
            onSubmit={(newItem) => setItems((prev) => [...prev, newItem])}
          />
        </main>
      </div>
    </div>
  );
}
