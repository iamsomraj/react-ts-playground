import React, { useEffect, useMemo, useRef, useState } from 'react';

const NUMBER_OF_OTP_DIGITS = 4;

function App() {
  const [digits, setDigits] = useState<string[]>(() => {
    return Array(NUMBER_OF_OTP_DIGITS).fill('');
  });

  const formRef = useRef<HTMLFormElement | null>(null);

  useEffect(() => {
    if (!formRef.current) {
      return;
    }

    const firstInput = formRef.current.firstElementChild as HTMLInputElement;
    firstInput.focus();
  }, []);

  const formattedDigits = useMemo(() => {
    return digits.join('');
  }, [digits]);

  useEffect(() => {
    if (formattedDigits.length < NUMBER_OF_OTP_DIGITS) {
      return;
    }

    console.log({ digits: formattedDigits });
  }, [formattedDigits]);

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const index = parseInt(e.target.name, 10);
    const inputValue = e.target.value.slice(0, 1);

    setDigits((prevDigits) => {
      prevDigits[index] = inputValue;
      return [...prevDigits];
    });

    if (index < NUMBER_OF_OTP_DIGITS - 1 && inputValue !== '') {
      const nextInput = formRef.current?.elements[`${index + 1}`] as HTMLInputElement;
      nextInput.focus();
    }
  };

  return (
    <>
      <form ref={formRef}>
        {digits.map((digitItem, index) => (
          <input
            id={`input-${index}`}
            type='number'
            key={index}
            maxLength={1}
            name={`${index}`}
            value={digitItem}
            onChange={onInputChange}
          />
        ))}
      </form>
    </>
  );
}

export default App;
