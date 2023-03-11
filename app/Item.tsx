'use client';

import { Disclosure } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import { useState } from 'react';
import { ItemType } from './page';

type ItemProps = {
  item: ItemType;
  updateItemQuantity: (item: ItemType, quantity: number) => void;
  removeItem: (item: ItemType) => void;
};

const Item = ({ item, updateItemQuantity, removeItem }: ItemProps) => {
  const {
    name,
    company,
    description,
    price,
    quantity,
    category,
    ...properties
  } = item;

  function handleRemoveItem() {
    const confirmed = window.confirm(
      'Are you sure you want to delete this item?'
    );
    if (confirmed) {
      removeItem(item);
    }
  }

  return (
    <Disclosure>
      {({ open }) => (
        <div className="py-2 px-1 mb-4">
          <div key={name} className="flex">
            <div className="w-full">
              <Disclosure.Button className="flex justify-between items-center w-full hover:bg-primary-200 transition-all p-2">
                <div>
                  <h2 className="text-2xl font-bold text-left">{name}</h2>
                  <p className="text-sm text-gray-500">{company}</p>
                </div>
                <div className="flex">
                  <p className="text-lg font-bold">${price}</p>
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
                value={quantity}
                onChange={(e) => {
                  updateItemQuantity(item, parseInt(e.target.value));
                }}
              />
            </div>
          </div>
          <Disclosure.Panel>
            <div className="p-2">
              <p className="text-sm">{description}</p>
              {Object.entries(properties).map(([key, value]) => {
                // turn camelcase key into words with spaces
                const formattedKey = key.replace(/([A-Z])/g, ' $1').trim();
                return (
                  <div key={key} className="text-sm">
                    <span className="uppercase">{formattedKey}:</span>{' '}
                    <span className="capitalize">{value}</span>
                  </div>
                );
              })}
            </div>
            <button
              className="text-primary mt-4 p-2 hover:bg-primary hover:text-white transition-all"
              onClick={handleRemoveItem}
            >
              Delete Item
            </button>
          </Disclosure.Panel>
        </div>
      )}
    </Disclosure>
  );
};

const FORM_FIELDS = [
  'name',
  'company',
  'description',
  'price',
  'category',
  'quantity',
] as const;

const defaultFormState: ItemType = {
  name: '',
  company: '',
  description: '',
  price: 0,
  quantity: 0,
  category: '',
};

const REQUIRED_FIELDS = ['name', 'price', 'category'];

export function ItemForm({ onSubmit }: { onSubmit: (item: ItemType) => void }) {
  const [formState, setFormState] = useState(defaultFormState);

  const [formVisible, setFormVisible] = useState(false);
  const buttonStyle = formVisible ? 'bg-secondary' : 'bg-primary';

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const target = e.target;
    const value = target.value;
    const name = target.name;

    setFormState({
      ...formState,
      [name]: value,
    });
  }

  function addField() {
    setFormState({
      ...formState,
      'Field Name': '',
    });
  }

  console.log({ formState });

  return (
    <div>
      {formVisible && (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            console.log('SUBMITTING');
            console.log(e);
            onSubmit(formState);
            setFormState(defaultFormState);
          }}
        >
          <div className="grid gap-2 grid-cols-2">
            {FORM_FIELDS.map((field) => {
              if (field === 'quantity') return null;
              return (
                <label className="capitalize" key={field}>
                  <div className="text-sm">{field}</div>
                  <input
                    className="border border-gray-300 text-secondary p-1 w-full"
                    type="text"
                    name={field}
                    id={field}
                    value={formState[field]}
                    onChange={handleChange}
                    required={REQUIRED_FIELDS.includes(field)}
                  />
                </label>
              );
            })}
          </div>
          {Object.entries(formState).map(([key, value], index) => {
            if (FORM_FIELDS.includes(key as any)) return null;

            return (
              <div key={index} className="grid gap-2 grid-cols-2">
                <label className="capitalize">
                  Field Name
                  <input
                    className="border border-gray-300 text-secondary p-1 w-full"
                    type="text"
                    value={key}
                    placeholder="Field Name"
                    // on change, update the key in the form state
                    onChange={(e) => {
                      const newKey = e.target.value;
                      setFormState((prev) => {
                        const newFormState = { ...prev };
                        delete newFormState[key];
                        newFormState[newKey] = value;
                        return newFormState;
                      });
                    }}
                  />
                </label>
                <label className="capitalize">
                  Field Value
                  <input
                    className="border border-gray-300 text-secondary p-1 w-full"
                    type="text"
                    name={key}
                    id={key}
                    value={value}
                    onChange={handleChange}
                    placeholder="Field Value"
                  />
                </label>
              </div>
            );
          })}
          <button onClick={addField} type="button">
            Add Custom Field
          </button>
          <button
            className="bg-primary text-white p-2 mt-2 block w-full"
            type="submit"
          >
            Add Item
          </button>
        </form>
      )}
      <button
        className={`${buttonStyle} text-white p-2 mt-2 block w-full`}
        onClick={() => setFormVisible((prev) => !prev)}
      >
        {formVisible ? 'Cancel' : 'Add New Item'}
      </button>
    </div>
  );
}

export default Item;
