import { useState } from 'react';

type GameContainerProps = {
  buttons: string[];
  entries: [string, string][];
};

const GameContainer = ({ buttons, entries }: GameContainerProps) => {
  const [guesses, setGuesses] = useState<string[]>([]);
  const [correctGuesses, setCorrectGuesses] = useState<string[]>([]);

  const onButtonClick = (btn: string) => {
    setGuesses((prevGuesses) => {
      const newGuesses = [...prevGuesses, btn];
      if (newGuesses.length > 2) {
        return [btn];
      }
      return newGuesses;
    });

    const isCorrect = entries.some((correctPair) => correctPair.every((element) => guesses.includes(element)));
    if (guesses.length === 2 && isCorrect) {
      const newCorrectGuesses = [...guesses];
      setCorrectGuesses(newCorrectGuesses);
    }
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
    const isCorrect = entries.some((correctPair) => correctPair.every((element) => guesses.includes(element)));

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

  return (
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
