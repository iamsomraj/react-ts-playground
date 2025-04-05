import { useState } from 'react';

type CheckboxType = {
  id: number;
  name: string;
  value: boolean;
  child: CheckboxType[];
};

const checkboxData: CheckboxType[] = [
  {
    id: 1,
    name: 'Fruit',
    value: false,
    child: [
      {
        id: 1.1,
        name: 'Apple',
        value: false,
        child: [
          { id: 1.11, name: 'Green Apple', value: false, child: [] },
          { id: 1.12, name: 'Red Apple', value: false, child: [] },
        ],
      },
      { id: 1.2, name: 'Orange', value: false, child: [] },
      { id: 1.3, name: 'Mango', value: false, child: [] },
    ],
  },
  {
    id: 2,
    name: 'Vegetable',
    value: false,
    child: [
      {
        id: 2.1,
        name: 'Potato',
        value: false,
        child: [
          { id: 2.11, name: 'Good Potato', value: false, child: [] },
          { id: 2.12, name: 'Bad Potato', value: false, child: [] },
        ],
      },
      { id: 2.2, name: 'Onion', value: false, child: [] },
    ],
  },
];

const Checkbox = ({ item, onCheckboxChange }: { item: CheckboxType; onCheckboxChange: (item: CheckboxType, checked: boolean) => void }) => {
  return (
    <div>
      <input
        id={String(item.id)}
        type='checkbox'
        checked={item.value}
        onChange={(e) => onCheckboxChange(item, e.target.checked)}
      />
      <label
        htmlFor={String(item.id)}
        style={{ paddingLeft: '5px' }}
      >
        {item.name}
      </label>
      <div style={{ paddingLeft: '20px' }}>
        {item.child.length
          ? item.child.map((childItem) => (
              <Checkbox
                key={childItem.id}
                item={childItem}
                onCheckboxChange={onCheckboxChange}
              />
            ))
          : null}
      </div>
    </div>
  );
};

export default function App() {
  const [formData, setFormData] = useState(() => checkboxData);
  
  const onCheckboxChange = (item: CheckboxType, isChecked: boolean) => {
    const newFormData = JSON.parse(JSON.stringify(formData));

    const updateItem = (items: CheckboxType[], targetId: number, checked: boolean): boolean => {
      let allChildrenChecked = true;

      for (let i = 0; i < items.length; i++) {
        if (items[i].id === targetId) {
          // Update the clicked item
          items[i].value = checked;

          // Update all children recursively
          if (items[i].child.length > 0) {
            items[i].child.forEach((child) => {
              updateItem([child], child.id, checked);
            });
          }

          return checked;
        }

        // Check if this item has children that might contain our target
        if (items[i].child.length > 0) {
          const childrenAllChecked = updateItem(items[i].child, targetId, checked);

          // Update parent based on children's state
          if (childrenAllChecked !== undefined) {
            // Check if all siblings are checked
            const allSiblingsChecked = items[i].child.every((child) => child.value);
            items[i].value = allSiblingsChecked;
            allChildrenChecked = allChildrenChecked && allSiblingsChecked;
          } else {
            allChildrenChecked = allChildrenChecked && items[i].value;
          }
        } else {
          allChildrenChecked = allChildrenChecked && items[i].value;
        }
      }

      return allChildrenChecked;
    };

    updateItem(newFormData, item.id, isChecked);
    setFormData(newFormData);
  };

  return (
    <div>
      {formData.map((item) => (
        <Checkbox
          key={item.id}
          item={item}
          onCheckboxChange={onCheckboxChange}
        />
      ))}
    </div>
  );
}
