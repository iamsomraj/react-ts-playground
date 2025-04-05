import { useState, memo, useCallback } from 'react';

type FormDataType = Record<number, boolean>;

type CheckboxType = {
  id: number;
  name: string;
  child: CheckboxType[];
};

type CheckboxProps = {
  item: CheckboxType;
  formData: FormDataType;
  onChange: (item: CheckboxType, id: number, isChecked: boolean) => void;
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

// Helper functions for updating checkbox states
const updateChildren = (formData: FormDataType, item: CheckboxType, isChecked: boolean): void => {
  if (item.child.length > 0) {
    item.child.forEach((node) => {
      formData[node.id] = isChecked;
      updateChildren(formData, node, isChecked);
    });
  }
};

const updateParent = (formData: FormDataType, item: CheckboxType): void => {
  const childrenSelected = item.child.every((citem) => {
    if (citem.child.length > 0) updateParent(formData, citem);
    return !!formData[citem.id];
  });
  formData[item.id] = childrenSelected;
};

// Memoized checkbox component to prevent unnecessary re-renders
const Checkbox = memo(({ item, formData, onChange }: CheckboxProps) => {
  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange(item, item.id, e.target.checked);
    },
    [item, onChange]
  );

  return (
    <div className='parent'>
      <input
        type='checkbox'
        id={`checkbox-${item.id}`}
        name={item.name}
        value={item.id}
        checked={formData?.[item.id] || false}
        onChange={handleChange}
      />
      <label htmlFor={`checkbox-${item.id}`}>{item.name}</label>
      {item.child.length > 0 &&
        item.child.map((childItem) => (
          <Checkbox
            key={childItem.id}
            item={childItem}
            formData={formData}
            onChange={onChange}
          />
        ))}
    </div>
  );
});

Checkbox.displayName = 'Checkbox';

export default function App() {
  const [formData, setFormData] = useState<FormDataType>({});

  const handleCheckboxChange = useCallback((item: CheckboxType, id: number, isChecked: boolean) => {
    setFormData((prevFormData) => {
      const newFormData = { ...prevFormData, [id]: isChecked };

      // Update children based on parent selection
      updateChildren(newFormData, item, isChecked);

      // Update all parent checkboxes
      checkboxData.forEach((checkbox) => updateParent(newFormData, checkbox));

      return newFormData;
    });
  }, []);

  return (
    <div>
      {checkboxData.map((item) => (
        <Checkbox
          key={item.id}
          item={item}
          formData={formData}
          onChange={handleCheckboxChange}
        />
      ))}
    </div>
  );
}
