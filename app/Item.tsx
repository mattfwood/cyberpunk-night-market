import { Disclosure } from '@headlessui/react';
import { ItemType } from './page';

const Item = ({ item }: { item: ItemType }) => {
  return (
    <Disclosure>
      <div key={item.name} className="p-4 mb-4">
        <Disclosure.Button>
          <div className="flex">
            <div>
              <h2 className="text-2xl font-bold">{item.name}</h2>
              <p className="text-sm text-gray-500">{item.company}</p>
            </div>
            <p className="text-lg font-bold">${item.price}</p>
          </div>
        </Disclosure.Button>
        <Disclosure.Panel>
          <p className="text-sm">{item.description}</p>
        </Disclosure.Panel>
      </div>
    </Disclosure>
  );
};

export default Item;
