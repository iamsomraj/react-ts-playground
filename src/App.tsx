import { useState } from 'react';
import './App.css';

function App() {
  const [dots, setDots] = useState<Record<string, number>[]>([]);
  const [removedDots, setRemovedDots] = useState<Record<string, number>[]>([]);

  const onUndo = () => {
    const [removedDot, ...rest] = dots;
    setDots(() => [...rest]);
    setRemovedDots((prev) => {
      return [removedDot, ...prev];
    });
  };

  const onRedo = () => {
    const [undoedDot, ...rest] = removedDots;
    setRemovedDots(() => [...rest]);
    setDots((prev) => {
      return [undoedDot, ...prev];
    });
  };

  const onDotAdd = (e: React.MouseEvent<HTMLButtonElement>) => {
    setDots((prev) => [
      {
        x: e.clientX,
        y: e.clientY,
      },
      ...prev,
    ]);
  };

  return (
    <>
      <div className='container'>
        <button
          onClick={onDotAdd}
          className='canvas'>
          {dots.map((dot, index) => (
            <div
              key={index}
              className='circle'
              style={{ top: dot.y, left: dot.x }}></div>
          ))}
        </button>

        <div className='footer'>
          <button
            disabled={dots.length === 0}
            onClick={onUndo}>
            Undo
          </button>
          <button
            disabled={removedDots.length === 0}
            onClick={onRedo}>
            Redo
          </button>
        </div>
      </div>
    </>
  );
}

export default App;
