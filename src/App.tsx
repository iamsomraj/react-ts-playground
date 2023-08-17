import { useState } from 'react';
import ErrorBoundary from './components/ErrorBoundary';

function App() {
  const [error, setError] = useState<boolean>();
  return (
    <>
      <ErrorBoundary
        hasError={!!error}
        onReset={() => setError(false)}>
        <button onClick={() => setError(true)}>Trigger Error</button>
      </ErrorBoundary>
    </>
  );
}

export default App;
