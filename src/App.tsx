import { useRef, useState } from 'react';

function App() {
  const [count, setCount] = useState<number>(0);
  const intervalId = useRef<number | null>(null);

  const onStart = () => {
    if (intervalId.current) return;

    intervalId.current = setInterval(() => {
      setCount((prev) => prev + 1);
    }, 1000);
  };

  const onStop = () => {
    if (!intervalId.current) return;

    clearInterval(intervalId.current);
    intervalId.current = null;
  };
  return (
    <>
      <div>{count}</div>
      <div>
        <button onClick={onStart}>Start</button>
      </div>
      <div>
        <button onClick={onStop}>Stop</button>
      </div>
    </>
  );
}

export default App;
