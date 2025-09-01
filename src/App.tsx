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

  return (
    <div className='App'>
      {otp.join('')}
      {Array(NUMBER_OF_OTP_DIGITS)
        .fill(null)
        .map((_, index) => (
          <input
            ref={(element) => (inputRefs.current[index] = element)}
            key={index}
            type='text'
            value={otp[index]}
            onChange={(event) => handleInputChange(index, event)}
          />
        ))}
    </div>
  );
}
