import { useContext } from 'react';
import ThemeContext from '../context/ThemeContext';

export default function HelloWorld() {
  const { theme, setDarkTheme, setLightTheme } = useContext(ThemeContext);

  const onToggle = () => {
    if (theme === 'dark') {
      setLightTheme();
    } else {
      setDarkTheme();
    }
  };

  return (
    <div>
      <p>
        <strong>{theme}</strong>
      </p>
      <button onClick={onToggle}>Toggle</button>
    </div>
  );
}
