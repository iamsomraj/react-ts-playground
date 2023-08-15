import { useRef } from 'react';
import Greet, { ToggleType } from './Greet';

export default function HelloWorld() {
  const greetRef = useRef<ToggleType>(null);
  const onToggle = () => {
    if (!greetRef.current) {
      return;
    }

    greetRef.current.toggle();
  };
  return (
    <div>
      <button onClick={onToggle}>Greet</button>
      <Greet ref={greetRef} />
    </div>
  );
}
