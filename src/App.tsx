import { FormEvent, useState } from 'react';

type TOptions = Record<string, boolean>;

enum PASSSWORD_LENGTHS {
  MIN = 10,
  MAX = 30,
}

function App() {
  const [length, setLength] = useState<number>(10);
  const [password, setPassword] = useState<string>(() => {
    let blankPassword = '';
    for (let index = 0; index < PASSSWORD_LENGTHS.MAX; index++) {
      blankPassword += '';
    }
    return blankPassword;
  });
  const [options, setOptions] = useState<TOptions>({
    lowercase: false,
    uppercase: false,
    numbers: false,
    symbols: false,
  });

  const pickRandomCharacter = (options: string[], mapping: Record<string, string[]>) => {
    const randomOptionKey = Math.floor(Math.random() * options.length);
    const randomOption = options[randomOptionKey];
    const characters = mapping[randomOption];
    const randomCharactersKey = Math.floor(Math.random() * characters.length);
    return characters[randomCharactersKey];
  };

  const createCharacter = () => {
    const mapping = {
      lowercase: ['a', 'b', 'c', 'd', 'e', 'f'],
      uppercase: ['A', 'B', 'C', 'D', 'E', 'F'],
      numbers: ['0', '1', '2', '3', '4', '5', '6'],
      symbols: ['$', '%', '&', '*', '(', ')'],
    };
    const availableOptions = Object.keys(options).filter((key) => options[key] === true);

    return pickRandomCharacter(availableOptions, mapping);
  };

  const createPassword = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let result = '';
    for (let index = 0; index < length; index++) {
      result += createCharacter();
    }
    setPassword(result);
  };

  return (
    <>
      <h1>Password Generator</h1>
      <form onSubmit={createPassword}>
        <div>
          <label htmlFor='length'>Select Length</label>
          <input
            id='length'
            type='range'
            min={PASSSWORD_LENGTHS.MIN}
            max={PASSSWORD_LENGTHS.MAX}
            value={length}
            onChange={(e) => setLength(Number(e.target.value))}
          />
          {JSON.stringify(length)}
        </div>
        <div>
          <label>Include Uppercase</label>
          <input
            type='checkbox'
            name='uppercase'
            checked={options.uppercase === true}
            onChange={(e) =>
              setOptions((prevOptions) => {
                return {
                  ...prevOptions,
                  [e.target.name]: e.target.checked,
                };
              })
            }
          />
        </div>
        <div>
          <label>Include Lowercase</label>
          <input
            type='checkbox'
            name='lowercase'
            checked={options.lowercase === true}
            onChange={(e) =>
              setOptions((prevOptions) => {
                return {
                  ...prevOptions,
                  [e.target.name]: e.target.checked,
                };
              })
            }
          />
        </div>
        <div>
          <label>Include Numbers</label>
          <input
            type='checkbox'
            name='numbers'
            checked={options.numbers === true}
            onChange={(e) =>
              setOptions((prevOptions) => {
                return {
                  ...prevOptions,
                  [e.target.name]: e.target.checked,
                };
              })
            }
          />
        </div>
        <div>
          <label>Include Symbols</label>
          <input
            type='checkbox'
            name='symbols'
            checked={options.symbols === true}
            onChange={(e) =>
              setOptions((prevOptions) => {
                return {
                  ...prevOptions,
                  [e.target.name]: e.target.checked,
                };
              })
            }
          />
        </div>
        <button>Create</button>
      </form>
      <div>{password}</div>
    </>
  );
}

export default App;
