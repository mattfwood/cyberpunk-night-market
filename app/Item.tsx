'use client';

import { Disclosure } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import { useState } from 'react';
import { ItemType } from './page';

type ItemProps = {
  item: ItemType;
  updateItemQuantity: (item: ItemType, quantity: number) => void;
};

const Item = ({ item, updateItemQuantity }: ItemProps) => {
  return (
    <Disclosure>
      {({ open }) => (
        <div className="py-2 px-1 mb-4">
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

const FORM_FIELDS = ['name', 'company', 'description', 'price', 'category'];

export function ItemForm({ onSubmit }: { onSubmit: (item: ItemType) => void }) {
  const [formVisible, setFormVisible] = useState(false);
  const buttonStyle = formVisible ? 'bg-secondary' : 'bg-primary';

  return (
    <div>
      {formVisible && (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            console.log('SUBMITTING');
            const target = e.target as typeof e.target & {
              name: { value: string };
              company: { value: string };
              description: { value: string };
              price: { value: string };
              category: { value: string };
            };
            const item = {
              name: target.name.value,
              company: target.company.value,
              description: target.description.value,
              price: parseInt(target.price.value),
              category: target.category.value.toLowerCase(),
              quantity: 0,
            };
            onSubmit(item);
          }}
        >
          <div className="grid gap-2 grid-cols-2">
            {FORM_FIELDS.map((field) => (
              <label className="capitalize" key={field}>
                <div className="text-sm">{field}</div>
                <input
                  className="border border-gray-300 text-secondary p-1 w-full"
                  type="text"
                  name={field}
                  id={field}
                />
              </label>
            ))}
          </div>
          <button
            className="bg-primary text-white p-2 mt-2 block w-full"
            type="submit"
          >
            Add
          </button>
        </form>
      )}
      <button
        className={`${buttonStyle} text-white p-2 mt-2 block w-full`}
        onClick={() => setFormVisible((prev) => !prev)}
      >
        {formVisible ? 'Cancel' : 'Add Item'}
      </button>
    </div>
  );
}

export default Item;
