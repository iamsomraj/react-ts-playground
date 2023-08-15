import { forwardRef, useImperativeHandle, useState } from 'react';

export type ToggleType = {
  toggle: () => void;
};

const Greet = forwardRef<ToggleType>((_props, parentRef) => {
  const [show, setShow] = useState(false);
  useImperativeHandle(parentRef, () => ({
    toggle: () => {
      setShow((prev) => !prev);
    },
  }));
  return <div>{show ? 'Hey there!' : 'Sleeping'}</div>;
});
export default Greet;
