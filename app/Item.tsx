'use client';

import { Disclosure } from '@headlessui/react';
import { ItemType } from './page';

const Item = ({ item }: { item: ItemType }) => {
  return (
    <Disclosure>
      <div key={item.name} className="p-4 mb-4">
        <Disclosure.Button className="flex justify-between w-full hover:bg-primary-200 transition-all py-2 px-1">
          <div>
            <h2 className="text-2xl font-bold">{item.name}</h2>
            <p className="text-sm text-gray-500">{item.company}</p>
          </div>
          <p className="text-lg font-bold">${item.price}</p>
        </Disclosure.Button>
        <Disclosure.Panel>
          <p className="text-sm">{item.description}</p>
        </Disclosure.Panel>
      </div>
    </Disclosure>
  );
};

export default Item;
