import React, { useState } from 'react';

// Components
import Display from './Display';
import StartButton from './StartButton';
import Stage from './Stage'; 

// Styled Components
import { StyledTetrisWrapper, StyledTetris } from './styles/StyledTetris';

// Custom Hooks
import { useInterval } from '../hooks/useInterval';
import { usePlayer } from '../hooks/usePlayer';
import { useStage } from '../hooks/useStage';
import { useGameStatus } from '../hooks/useGameStatus';

import { createStage, checkCollision } from '../gameHelpers';


const Tetris = () => {
  
  // Initializing variables and functions
  const [dropTime, setDropTime] = useState(null);
  const [speed, setSpeed] = useState(null);
  const [gameOver, setGameOver] = useState(false);

  const [player, updatePlayerPos, resetPlayer, playerRotate] = usePlayer();
  const [stage, setStage, rowsCleared] = useStage(player, resetPlayer);
  const [score, setScore, rows, setRows, level, setLevel] = useGameStatus(rowsCleared);

  const movePlayer = dir => {
    if (!checkCollision(player, stage, {x: dir, y: 0})) {
      updatePlayerPos({x: dir, y: 0});
    }
  }

  const startGame = () => {
    setStage(createStage());
    setSpeed(1000); 
    setDropTime(speed);
    resetPlayer();
    setGameOver(false);
    setRows(0);
    setLevel(0);
    setScore(0);
  }

  const drop = () => {
    // Increase level after 10 rows are cleared
    if (rows > (level + 1) * 10) {
      setLevel (prev => prev + 1);
      setSpeed(1000 / (level + 1) + 200);
    }

    if (!checkCollision(player, stage, {x: 0, y: 1})) {
      updatePlayerPos({x: 0, y: 1, collided: false});
    } else {
      // Game Over
      if (player.pos.y < 1) {
        setGameOver(true);
        setDropTime(null);
      }
      updatePlayerPos({x: 0, y: 0, collided: true});
    }
  }

  const keyUp = ({keyCode}) => {
    if(!gameOver){
      if (keyCode === 40) {
        setDropTime(speed); 
      }
    }
  }

  const dropPlayer = () => {
    setDropTime(null); 
    setScore(prev => prev + 10*(level+1));
    drop();
  }
  
  const move = ({ keyCode }) => {
    if (!gameOver) {
      switch (keyCode) {
        case 37: // Left
          movePlayer(-1);
        break;
        case 39: // Right
          movePlayer(1);
        break;
        case 40: // Down
          dropPlayer();
        break;
        case 38: // Up
          playerRotate(stage, 1);
        break;
      }
    }
  }

  useInterval(() => {drop()}, dropTime); 

  return(
    // StyledTetrisWrapper covers the entire screen, and the tabIndex, role, and onKeyDown will
    //  record the user's input without having to click on some certain element
    <StyledTetrisWrapper 
      role="Button" 
      tabIndex="0" 
      onKeyDown={e => move(e)} 
      onKeyUp={keyUp}
    >

      <StyledTetris> 
        <Stage stage={stage}/>
        <aside>
          {gameOver ? (
              <Display gameOver={gameOver} text="Game Over!" />
            ) : ( 
              <div>
                <Display text={`Score: ${score}`} />
                <Display text={`Rows: ${rows}`} />
                <Display text={`Level: ${level}`} />
              </div>
          )}
          <StartButton callback={startGame} /> // Why not need to use () to call startGame function?
        </aside>
      </StyledTetris> 
    </StyledTetrisWrapper>
  )
}

export default Tetris;
