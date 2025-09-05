import React, { useState, useEffect } from 'react';
import './RockPaperScissors.css';

const choices = ['rock', 'paper', 'scissors'];
const WINNING_SCORE = 5;

function RockPaperScissors() {

  // State variables to track player and computer choices, scores, game state, etc.
  
  const [playerChoice, setPlayerChoice] = useState(null);
  const [computerChoice, setComputerChoice] = useState(null);
  const [result, setResult] = useState('');                        
  const [playerScore, setPlayerScore] = useState(0);
  const [computerScore, setComputerScore] = useState(0);
  const [waiting, setWaiting] = useState(false);                        // To disable buttons while computer "plays"
  const [gameOver, setGameOver] = useState(false);                      // To mark if game has ended

  function play(playerSelection) {                                      // Function to handle the player making a choice and running one round of the game
    if (waiting || gameOver) return;

    setPlayerChoice(playerSelection);
    setWaiting(true);                                                     // Disable the buttons while computer chooses it's pick
    setResult('Computer is playing...');                                 // Show waiting message

    setTimeout(() => {                                                  
      const computerSelection = choices[Math.floor(Math.random() * choices.length)];     // Computer randomly picks rock, paper, or scissors
      setComputerChoice(computerSelection);

      let roundResult = '';
      if (playerSelection === computerSelection) {                                       // Determine round result by comparing choices
        roundResult = "It's a tie!";
      } else if (
        (playerSelection === 'rock' && computerSelection === 'scissors') ||
        (playerSelection === 'paper' && computerSelection === 'rock') ||
        (playerSelection === 'scissors' && computerSelection === 'paper')
      ) {
        roundResult = 'You win this round!';
        setPlayerScore(score => score + 1);                                              // Increment player score
      } else {
        roundResult = 'Computer wins this round!';
        setComputerScore(score => score + 1);                                            // Increment computer score
      }
      setResult(roundResult);                                                            // Show round result
      setWaiting(false);                                                                 // Re-enable buttons
    }, 1500);
  }

  useEffect(() => {                                                      // useEffect runs after every score change to check if someone won the game
    if (playerScore >= WINNING_SCORE) {
      setResult('Game Over! You won!');
      setGameOver(true);
    } else if (computerScore >= WINNING_SCORE) {
      setResult('Game Over! Computer won!');
      setGameOver(true);
    }
  }, [playerScore, computerScore]);                                      // Runs when either score changes

  function resetGame() {                                                 // Reset game to initial state for replay
    setPlayerScore(0);
    setComputerScore(0);
    setPlayerChoice(null);
    setComputerChoice(null);
    setResult('');
    setGameOver(false);
  }

  function capitalize(word) {                                             // Capitalizes the first letter for display purposes
    return word.charAt(0).toUpperCase() + word.slice(1);
  }

  return (                                                                // return this component to render UI of the game
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
            onClick={() => play(choice)}                                   // Call play on click with chosen option
            className={`btn ${choice}`}
            disabled={waiting || gameOver}                                 // Disable button if waiting or game over
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
