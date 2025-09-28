import { useState } from 'react';

type SelectableGridProps = {
  row: number;
  col: number;
};

type Position = {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
};

export default function SelectableGrid({ row, col }: SelectableGridProps) {
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [pos, setPos] = useState<Position>({ x1: -1, y1: -1, x2: -1, y2: -1 });

  function handleMouseDown(r: number, c: number) {
    setIsMouseDown(true);
    setPos({ x1: -1, y1: -1, x2: -1, y2: -1 });
    setPos((p) => ({ ...p, x1: r, y1: c }));
  }
  function handleMouseUp(r: number, c: number) {
    setPos((p) => ({ ...p, x2: r, y2: c }));
    setIsMouseDown(false);
  }
  function handleMouseEnter(r: number, c: number) {
    if (!isMouseDown) return;

    setPos((p) => ({ ...p, x2: r, y2: c }));
  }

  const xStart = Math.min(pos?.x1, pos?.x2);
  const yStart = Math.min(pos?.y1, pos?.y2);
  const xEnd = Math.max(pos?.x1, pos?.x2);
  const yEnd = Math.max(pos?.y1, pos?.y2);

  const selectedCells: string[] = [];
  for (let i = xStart; i <= xEnd; i++) {
    for (let j = yStart; j <= yEnd; j++) {
      selectedCells.push(`${i}${j}`);
    }
  }

  function isSelected(r: number, c: number) {
    return selectedCells.includes(`${r}${c}`);
  }

  return (
    <div
      className='selectable-grid'
      style={{
        gridTemplateColumns: `repeat(${row}, 1fr)`,
      }}
    >
      {Array.from({ length: col }, (_, i) => i + 1).map((colIndex) => {
        return (
          <div
            key={'col' + colIndex}
            className='col'
          >
            {Array.from({ length: row }, (_, i) => i + 1).map((rowIndex) => {
              return (
                <div
                  key={'row' + rowIndex}
                  className={`col ${isSelected(rowIndex, colIndex) ? 'selected' : ''}`}
                  onMouseDown={() => handleMouseDown(rowIndex, colIndex)}
                  onMouseUp={() => handleMouseUp(rowIndex, colIndex)}
                  onMouseEnter={() => handleMouseEnter(rowIndex, colIndex)}
                >
                  {rowIndex} {colIndex}
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}
