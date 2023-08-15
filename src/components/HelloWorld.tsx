import { useState } from 'react';

export default function HelloWorld() {
  const [name, setName] = useState<string>();
  return (
    <div>
      <input
        type='text'
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      {name}
    </div>
  );
}
