'use client';

import { Disclosure } from '@headlessui/react';
import { ItemType } from './page';

type ItemProps = {
  item: ItemType;
  updateItemQuantity: (item: ItemType, quantity: number) => void;
};

const Item = ({ item, updateItemQuantity }: ItemProps) => {
  return (
    <Disclosure>
      <div key={item.name} className="p-4 mb-4 flex">
        <Disclosure.Button className="flex justify-between items-center w-full hover:bg-primary-200 transition-all p-2">
          <div>
            <h2 className="text-2xl font-bold">{item.name}</h2>
            <p className="text-sm text-gray-500">{item.company}</p>
          </div>
          <p className="text-lg font-bold">${item.price}</p>
        </Disclosure.Button>
        <Disclosure.Panel>
          <p className="text-sm">{item.description}</p>
        </Disclosure.Panel>
        <div className="flex flex-col w-10 justify-center">
          {/* <button>+</button> */}
          <input
            className="text-secondary"
            type="number"
            min={0}
            value={item.quantity}
            onChange={(e) => {
              updateItemQuantity(item, parseInt(e.target.value));
            }}
          />
          {/* <button>-</button> */}
        </div>
      </div>
    </Disclosure>
  );
};

export default Item;
