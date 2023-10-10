import { useEffect, useState } from 'react';

const INITIAL_SCORE = 0;
const TIMER = 15;
const SCORE_TO_WIN = 15;

function App() {
  const [counter, setCounter] = useState(INITIAL_SCORE); // score of user
  const [gameTimer, setGameTimer] = useState(TIMER); // time value
  const [color, setColor] = useState('red'); // red // green
  const [gameResult, setGameResult] = useState('init'); // init // in-progress // win // game-over

  useEffect(() => {
    let intervalId: number | undefined = undefined;
    if (gameResult === 'in-progress' && gameTimer >= 1) {
      intervalId = setInterval(() => {
        setGameTimer((timer) => timer - 1);
        setColor(Math.random() >= 0.5 ? 'red' : 'green');
      }, 1000);
    } else {
      if (gameTimer === 0) {
        if (counter === SCORE_TO_WIN) {
          setGameResult('win');
        } else {
          setGameResult('game-over');
        }
      }
      clearInterval(intervalId);
    }
    return () => clearInterval(intervalId);
  }, [gameResult, gameTimer, color, counter]);

  const onStartGame = () => {
    setGameResult('in-progress');
    setCounter(INITIAL_SCORE);
    setGameTimer(TIMER);
  };

  const onBoxClick = () => {
    if (color === 'red' && gameTimer >= 1) {
      setGameResult('game-over');
    } else {
      setCounter((counter) => {
        if (counter + 1 === SCORE_TO_WIN) {
          setGameResult('win');
          return counter + 1;
        }
        return counter + 1;
      });
    }
  };

  return (
    <div>
      {['init', 'game-over', 'win'].includes(gameResult) && <button onClick={onStartGame}>Start Game</button>}
      {gameResult === 'in-progress' && (
        <div>
          <h1>Time Left: {gameTimer}s</h1>
          <button
            style={{ backgroundColor: color, width: '100px', height: '100px' }}
            onClick={() => onBoxClick()}></button>
        </div>
      )}
      <h1>Score: {counter}</h1>
      {gameResult === 'win' && <h1>You Win!</h1>}
    </div>
  );
}

export default App;
