import React, { FormEvent, useEffect, useRef, useState } from 'react';

const NUMBER_OF_OTP_DIGITS = 4;

function App() {
  const [digits, setDigits] = useState<string[]>(() => {
    return Array(NUMBER_OF_OTP_DIGITS).fill('');
  });

  const formRef = useRef<HTMLFormElement | null>(null);

  useEffect(() => {
    if (!formRef.current) return;

    const firstInput = formRef.current.firstElementChild as HTMLInputElement;
    firstInput.focus();
  }, []);

  const onDigitChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    setDigits((prevDigits) => {
      prevDigits[index] = e.target.value.slice(0, 1);
      return [...prevDigits];
    });

    if (index < NUMBER_OF_OTP_DIGITS - 1 && e.target.value !== '') {
      (formRef.current?.querySelector?.(`#input-${index + 1}`) as HTMLInputElement)?.focus();
    } else if (index === NUMBER_OF_OTP_DIGITS - 1) {
      onSubmit();
    }
  };

  const onSubmit = () => {
    console.log({ digits });
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
            onChange={(e) => onDigitChange(e, index)}
          />
        ))}
        {JSON.stringify(digits)}
      </form>
    </>
  );
}

export default App;
