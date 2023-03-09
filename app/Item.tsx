'use client';

import { Disclosure } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import { ItemType } from './page';

type ItemProps = {
  item: ItemType;
  updateItemQuantity: (item: ItemType, quantity: number) => void;
};

const Item = ({ item, updateItemQuantity }: ItemProps) => {
  return (
    <Disclosure>
      {({ open }) => (
        <div className="p-4 mb-4">
          <div key={item.name} className="flex">
            <div className="w-full">
              <Disclosure.Button className="flex justify-between items-center w-full hover:bg-primary-200 transition-all p-2">
                <div>
                  <h2 className="text-2xl font-bold">{item.name}</h2>
                  <p className="text-sm text-gray-500">{item.company}</p>
                </div>
                <div className="flex">
                  <p className="text-lg font-bold">${item.price}</p>
                  <ChevronDownIcon
                    className={`w-6 h-6 text-white ${open ? 'rotate-180' : ''}`}
                  />
                </div>
              </Disclosure.Button>
            </div>
            <div className="flex flex-col w-14 justify-center pl-2">
              <input
                className="text-secondary text-center"
                type="number"
                min={0}
                value={item.quantity}
                onChange={(e) => {
                  updateItemQuantity(item, parseInt(e.target.value));
                }}
              />
            </div>
          </div>
          <Disclosure.Panel>
            <p className="text-sm p-2">{item.description}</p>
          </Disclosure.Panel>
        </div>
      )}
    </Disclosure>
  );
};

export default Item;
