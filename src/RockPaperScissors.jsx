import React, { useState, useEffect } from 'react';
import './RockPaperScissors.css';

const choices = ['rock', 'paper', 'scissors'];
const WINNING_SCORE = 5;

function RockPaperScissors() {
  const [playerChoice, setPlayerChoice] = useState(null);
  const [computerChoice, setComputerChoice] = useState(null);
  const [result, setResult] = useState('');
  const [playerScore, setPlayerScore] = useState(0);
  const [computerScore, setComputerScore] = useState(0);
  const [waiting, setWaiting] = useState(false);
  const [gameOver, setGameOver] = useState(false);

  function play(playerSelection) {
    if (waiting || gameOver) return;

    setPlayerChoice(playerSelection);
    setWaiting(true);
    setResult('Computer is playing...');

    setTimeout(() => {
      const computerSelection = choices[Math.floor(Math.random() * choices.length)];
      setComputerChoice(computerSelection);

      let roundResult = '';
      if (playerSelection === computerSelection) {
        roundResult = "It's a tie!";
      } else if (
        (playerSelection === 'rock' && computerSelection === 'scissors') ||
        (playerSelection === 'paper' && computerSelection === 'rock') ||
        (playerSelection === 'scissors' && computerSelection === 'paper')
      ) {
        roundResult = 'You win this round!';
        setPlayerScore(score => score + 1);
      } else {
        roundResult = 'Computer wins this round!';
        setComputerScore(score => score + 1);
      }
      setResult(roundResult);
      setWaiting(false);
    }, 1500);
  }

  useEffect(() => {
    if (playerScore >= WINNING_SCORE) {
      setResult('Game Over! You won!');
      setGameOver(true);
    } else if (computerScore >= WINNING_SCORE) {
      setResult('Game Over! Computer won!');
      setGameOver(true);
    }
  }, [playerScore, computerScore]);

  function resetGame() {
    setPlayerScore(0);
    setComputerScore(0);
    setPlayerChoice(null);
    setComputerChoice(null);
    setResult('');
    setGameOver(false);
  }

  function capitalize(word) {
    return word.charAt(0).toUpperCase() + word.slice(1);
  }

  return (
    <div className="rps-container">
      <h1>Rock Paper Scissors</h1>
      <div className="scoreboard">
        <p id='a'>Your Score: {playerScore}</p>
        <p id='b'>Computer Score: {computerScore}</p>
      </div>
      <div className="buttons">
        {choices.map(choice => (
          <button 
            key={choice} 
            onClick={() => play(choice)} 
            className={`btn ${choice}`}
            disabled={waiting || gameOver}
          >
            {capitalize(choice)}
          </button>
        ))}
      </div>
      {(playerChoice && computerChoice) && (
        <div className="results">
          <p>You chose: <strong>{capitalize(playerChoice)}</strong></p>
          <p>Computer chose: <strong>{capitalize(computerChoice)}</strong></p>
        </div>
      )}
      <h2 className={
        result === 'You win this round!' ? 'result-win' :
        result === 'Computer wins this round!' ? 'result-lose' :
        result === "It's a tie!" ? 'result-tie' :
        result === 'Computer is playing...' || result.startsWith('Game Over') ? 'result-waiting' : ''
      }>
        {result}
      </h2>
      {gameOver && <button onClick={resetGame} className="reset-button">Play Again</button>}
    </div>
  );
}

export default RockPaperScissors;
