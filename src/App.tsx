import { useEffect, useState } from 'react';
import './App.css';

function shuffle(array: number[]) {
  let tmp,
    current,
    top = array.length;
  if (top)
    while (--top) {
      current = Math.floor(Math.random() * (top + 1));
      tmp = array[current];
      array[current] = array[top];
      array[top] = tmp;
    }
  return array;
}

const GRID_TYPE = [0, 1, 2, 3, 4, 5, 6, 7, 8];
const MAX_ATTEMPTS = GRID_TYPE.length;
const TIME = GRID_TYPE.length * 1000;

function App() {
  const [correctOrder] = useState(() => {
    return shuffle(GRID_TYPE);
  });
  const [visibleIndex, setVisibleIndex] = useState(0);
  const [userOrder, setUserOrder] = useState<number[]>([]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setVisibleIndex((prev) => ++prev);
    }, 1000);

    const timeoutId = setTimeout(() => {
      clearInterval(intervalId);
    }, TIME);

    return () => {
      clearInterval(intervalId);
      clearTimeout(timeoutId);
    };
  }, []);

  return (
    <>
      <div className='board'>
        {GRID_TYPE.map((cell, index) => (
          <div
            key={cell}
            className={`cell ${visibleIndex === index && 'visible'} ${userOrder.includes(index) && 'green'}`}
            onClick={() => {
              setUserOrder((order) => {
                if (order.length >= MAX_ATTEMPTS) return order;

                return [...order, index];
              });
            }}>
            {correctOrder[index]}
            <span className='cell-position'>{index}</span>
          </div>
        ))}

        {userOrder.length === MAX_ATTEMPTS ? userOrder.join() === correctOrder.join() ? <span className='winner'>Winner</span> : <span className='loser'>Loser</span> : null}
      </div>
    </>
  );
}

export default App;
