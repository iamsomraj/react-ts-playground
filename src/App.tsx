import React, { useRef, useState } from 'react';

const NUMBER_OF_OTP_DIGITS = 4;

export default function App() {
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const [otp, setOtp] = useState<string[]>(Array(NUMBER_OF_OTP_DIGITS).fill(''));

  function handleInputChange(index: number, event: React.ChangeEvent<HTMLInputElement>) {
    const newOtp = [...otp];
    const val = event.target.value.slice(-1) || '';
    newOtp[index] = val;
    setOtp([...newOtp]);
    const nextIndex = (index + 1) % NUMBER_OF_OTP_DIGITS;
    inputRefs.current[nextIndex]?.focus();
  }

  function handleKeyDown(index: number, event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === 'Backspace') {
      event.preventDefault(); // prevent default backspace navigation
      const newOtp = [...otp];

      if (newOtp[index]) {
        newOtp[index] = '';
        setOtp(newOtp);
      }

      if (index > 0) {
        inputRefs.current[index - 1]?.focus();
      }
    }
  }

  return (
    <div className='App'>
      {otp.join('')}
      {Array(NUMBER_OF_OTP_DIGITS)
        .fill(null)
        .map((_, index) => (
          <input
            className='input'
            ref={(element) => (inputRefs.current[index] = element)}
            key={index}
            type='text'
            value={otp[index]}
            onChange={(event) => handleInputChange(index, event)}
            onKeyDown={(event) => handleKeyDown(index, event)}
          />
        ))}
    </div>
  );
}
