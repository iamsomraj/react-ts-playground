import HelloWorld from './components/HelloWorld';
import { ThemeContextProvider } from './context/ThemeContext';
function App() {
  return (
    <>
      <ThemeContextProvider>
        <HelloWorld />
      </ThemeContextProvider>
    </>
  );
}

export default App;
