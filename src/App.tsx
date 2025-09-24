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

    // move to next input only if user typed (not emptying)
    if (val && index < NUMBER_OF_OTP_DIGITS - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  }

  function handleKeyDown(index: number, event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === 'Backspace') {
      event.preventDefault();
      const newOtp = [...otp];

      if (newOtp[index]) {
        newOtp[index] = '';
        setOtp(newOtp);
      } else if (index > 0) {
        inputRefs.current[index - 1]?.focus();
      }
    }
  }

  function handlePaste(event: React.ClipboardEvent<HTMLInputElement>, index: number) {
    event.preventDefault();
    const pastedData = event.clipboardData.getData('Text').slice(0, NUMBER_OF_OTP_DIGITS);
    const newOtp = [...otp];

    // Fill from the current index
    for (let i = 0; i < pastedData.length && index + i < NUMBER_OF_OTP_DIGITS; i++) {
      newOtp[index + i] = pastedData[i];
    }

    setOtp(newOtp);

    // focus the last filled input
    const nextIndex = Math.min(index + pastedData.length, NUMBER_OF_OTP_DIGITS - 1);
    inputRefs.current[nextIndex]?.focus();
  }

  return (
    <div className='App'>
      <div>Entered OTP: {otp.join('')}</div>
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
            onPaste={(event) => handlePaste(event, index)}
            maxLength={1}
          />
        ))}
    </div>
  );
}
