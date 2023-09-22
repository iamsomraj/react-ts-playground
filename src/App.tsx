import { useEffect, useState } from 'react';

function App() {
  const [counter, setCounter] = useState<number>(0);
  const [isRunning, setIsRunning] = useState<boolean>(false);

  useEffect(() => {
    let intervalRef: number | undefined;
    if (isRunning) {
      intervalRef = setInterval(() => {
        setCounter((prevCounter) => prevCounter + 1);
      }, 1000);
    } else {
      clearInterval(intervalRef);
    }
    return () => clearInterval(intervalRef);
  }, [isRunning]);

  const onCounterToggle = () => {
    setIsRunning(!isRunning);
  };

  const onCounterReset = () => {
    setIsRunning(false);
    setCounter(0);
  };

  return (
    <div>
      <h1>Counter : {counter}</h1>
      <button onClick={onCounterToggle}>{isRunning ? 'Pause' : 'Play'}</button>
      <button onClick={onCounterReset}>Reset</button>
    </div>
  );
}

export default App;
