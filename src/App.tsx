import { useEffect, useRef, useState } from 'react';

function App() {
  const lastItemRef = useRef<HTMLDivElement | null>(null);
  const [list, setList] = useState<number[]>([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);

  useEffect(() => {
    if (!lastItemRef.current) {
      return;
    }
    function loadListItems() {
      const lastItem: number = list[list.length - 1];
      const newItems: number[] = [];
      for (let i = 0; i < 10; i++) {
        newItems.push(lastItem + i + 2);
      }
      setList((prevList) => {
        return [...prevList, ...newItems];
      });
    }

    function handleObserver(entries: IntersectionObserverEntry[]) {
      for (let i = 0; i < entries.length; i++) {
        const entry = entries[i];
        if (entry.isIntersecting) {
          loadListItems();
        }
      }
    }

    const observerRef = new IntersectionObserver((entries) => handleObserver(entries), {
      root: null,
      threshold: 0.5,
    });

    observerRef.observe(lastItemRef.current);

    return () => {
      observerRef.disconnect();
    };
  }, [list]);

  const listContent = list.map((item, index) => (
    <div
      style={{ width: '100vw', padding: '5rem 0', border: 'solid #ccc', textAlign: 'center' }}
      key={item + '' + index}>
      {item}
    </div>
  ));

  return (
    <>
      {listContent}
      <div
        style={{ textAlign: 'center' }}
        ref={lastItemRef}>
        Bottom Of Page
      </div>
    </>
  );
}

export default App;
