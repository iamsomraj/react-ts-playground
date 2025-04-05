import { useState } from 'react';

type FormDataType = Record<number, boolean> | null;

type CheckboxType = {
  id: number;
  name: string;
  child: CheckboxType[];
};

type CheckboxProps = {
  item: CheckboxType;
  formData: FormDataType;
  setFormData: (checkbox: CheckboxType, id: number, isChecked: boolean) => void;
};

const checkboxData: CheckboxType[] = [
  {
    id: 1,
    name: 'Fruit',
    child: [
      {
        id: 1.1,
        name: 'Apple',
        child: [
          { id: 1.11, name: 'Green Apple', child: [] },
          { id: 1.12, name: 'Red Apple', child: [] },
        ],
      },
      { id: 1.2, name: 'Orange', child: [] },
      { id: 1.3, name: 'Mango', child: [] },
    ],
  },
  {
    id: 2,
    name: 'Vegetable',
    child: [
      {
        id: 2.1,
        name: 'Potato',
        child: [
          { id: 2.11, name: 'Good Potato', child: [] },
          { id: 2.12, name: 'Bad Potato', child: [] },
        ],
      },
      { id: 2.2, name: 'Onion', child: [] },
    ],
  },
];

function Checkbox({ item, formData, setFormData }: CheckboxProps) {
  return (
    <div className='parent'>
      <input
        type='checkbox'
        id={item.name}
        name={item.name}
        value={item.id}
        checked={formData?.[item.id] || false}
        onChange={(e) => setFormData(item, item.id, e.target.checked)}
      />
      <label htmlFor={item.name}>{item.name}</label>
      {item?.child
        ? item.child.map((childItem) => (
            <Checkbox
              key={childItem.id}
              item={childItem}
              formData={formData}
              setFormData={setFormData}
            />
          ))
        : null}
    </div>
  );
}

export default function App() {
  const [formData, setFormData] = useState<FormDataType>(null);

  const handleCheckboxChange = (item: CheckboxType, id: number, isChecked: boolean) => {
    setFormData((prevFormData) => {
      const newFormData = { ...prevFormData, [id]: isChecked };

      const updateChildren = (item: CheckboxType, isChecked: boolean) => {
        if (item.child.length > 0) {
          item.child.forEach((node) => {
            newFormData[node.id] = isChecked;
            updateChildren(node, isChecked);
          });
        }
        return;
      };

      updateChildren(item, isChecked);

      const updateParent = (item: CheckboxType) => {
        const childrenSelected = item.child.every((citem) => {
          if (citem.child.length > 0) updateParent(citem);

          return !!newFormData[citem.id];
        });
        newFormData[item.id] = childrenSelected;
      };

      checkboxData.map((cb) => updateParent(cb));

      return newFormData;
    });
  };

  return (
    <div>
      {checkboxData.map((item) => (
        <Checkbox
          key={item.id}
          item={item}
          formData={formData}
          setFormData={handleCheckboxChange}
        />
      ))}
    </div>
  );
}
