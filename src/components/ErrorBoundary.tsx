import React from 'react';

type Props = {
  hasError: boolean;
  children: React.ReactNode;
  onReset: () => void;
};

const ErrorBoundary = (props: Props) => {
  return props.hasError ? (
    <div>
      Error Occcured - 
      <button onClick={props.onReset}>Reset</button>
    </div>
  ) : (
    <div>{props.children}</div>
  );
};

export default ErrorBoundary;
