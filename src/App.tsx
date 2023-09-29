import { useState } from 'react';

type GameContainerProps = {
  buttons: string[];
  entries: [string, string][];
};

const isCorrectAnswer = (entries: [string, string][], guesses: string[]) => {
  return entries.some((correctPair) => correctPair.every((element) => guesses.includes(element)));
};

const GameContainer = ({ buttons, entries }: GameContainerProps) => {
  const [guesses, setGuesses] = useState<string[]>([]); // stores current guesses
  const [correctGuesses, setCorrectGuesses] = useState<string[]>([]); // stores only correct answers

  const onButtonClick = (btn: string) => {
    setGuesses((prevGuesses) => {
      const newGuesses = [...prevGuesses, btn];
      if (newGuesses.length === 2) {
        const isCorrect = isCorrectAnswer(entries, newGuesses);
        if (isCorrect) {
          setCorrectGuesses((prevCorrectGuesses) => {
            return [...new Set([...prevCorrectGuesses, ...newGuesses])];
          });
        }
      }
      if (newGuesses.length > 2) {
        return [btn];
      }
      return [...newGuesses];
    });
  };

  const getButtonStyle = (btn: string) => {
    const isSelected = guesses.includes(btn);

    if (!isSelected) {
      return {
        backgroundColor: 'black',
        color: 'white',
      };
    }

    const isPairSelected = guesses.length === 2;
    const isCorrect = isCorrectAnswer(entries, guesses);

    if (isPairSelected && !isCorrect) {
      return {
        backgroundColor: 'red',
        color: 'white',
      };
    }

    return {
      backgroundColor: 'blue',
      color: 'white',
    };
  };

  const filteredButtons = buttons.filter((btn) => !correctGuesses.includes(btn));

  return filteredButtons.length > 0 ? (
    <div>
      {filteredButtons.map((btn, index) => (
        <button
          key={index}
          style={getButtonStyle(btn)}
          onClick={() => onButtonClick(btn)}>
          {btn}
        </button>
      ))}
    </div>
  ) : (
    <div>Congrats</div>
  );
};

type CountryCapitalGameProps = {
  data: Record<string, string>;
};

const CountryCapitalGame = (props: CountryCapitalGameProps) => {
  const countries = Object.keys(props.data);
  const capitals = Object.values(props.data);
  const entries = Object.entries(props.data);
  const buttons = [...countries, ...capitals].sort(() => Math.random() - 0.5);
  return (
    <GameContainer
      buttons={buttons}
      entries={entries}
    />
  );
};

function App() {
  return (
    <>
      <CountryCapitalGame data={{ Germany: 'Berlin', India: 'New Delhi' }} />
    </>
  );
}

export default App;
