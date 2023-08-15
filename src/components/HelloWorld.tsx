import { useMemo, useState } from 'react';

const fib = (n: number): number => {
  if (n <= 1) {
    return n;
  }
  return fib(n - 1) + fib(n - 2);
};

export default function HelloWorld() {
  const [name, setName] = useState('');
  const hugeCalculation = useMemo(() => fib(35), []);
  return (
    <div>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      {hugeCalculation}
    </div>
  );
}
