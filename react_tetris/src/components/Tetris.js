import React, { useState } from 'react';

// Components
import Display from './Display';
import StartButton from './StartButton';
import Stage from './Stage'; 

// Styled Components
import { StyledTetrisWrapper, StyledTetris } from './styles/StyledTetris';

// Custom Hooks
import { usePlayer } from '../hooks/usePlayer';
import { useStage } from '../hooks/useStage';

import { createStage, checkCollision } from '../gameHelpers';


const Tetris = () => {
  
  const [dropTime, setDropTime] = useState(null);
  const [gameOver, setGameOver] = useState(false);

  const [player, updatePlayerPos, resetPlayer, playerRotate] = usePlayer();
  const [stage, setStage] = useStage(player, resetPlayer);

  const movePlayer = dir => {
    if (!checkCollision(player, stage, {x: dir, y: 0})) {
      updatePlayerPos({x: dir, y: 0});
    }
  }

  const startGame = () => {
    setStage(createStage());
    resetPlayer();
    setGameOver(false);
  }

  const drop = () => {
    if (!checkCollision(player, stage, {x: 0, y: 1})) {
      updatePlayerPos({x: 0, y: 1, collided: false});
    } else {
      // Game Over
      if (player.pos.y < 1) {
        console.log("GAMEOVER");
        setGameOver(true);
        setDropTime(null);
      }
      updatePlayerPos({x: 0, y: 0, collided: true});
    }
  }

  const dropPlayer = () => {
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

  return(
    // StyledTetrisWrapper covers the entire screen, and the tabIndex, role, and onKeyDown will
    //  record the user's input without having to click on some certain element
    <StyledTetrisWrapper role="Button" tabIndex="0" onKeyDown={e => move(e)}>
      <StyledTetris> 
        <Stage stage={stage}/>
        <aside>
          {gameOver ? (
              <Display gameOver={gameOver} text="Game Over!" />
            ) : ( 
              <div>
                <Display text="Score" />
                <Display text="Rows" />
                <Display text="Level" />
              </div>
          )}
          <StartButton callback={startGame} /> // Why not need to use () to call startGame function?
        </aside>
      </StyledTetris> 
    </StyledTetrisWrapper>
  )
}

export default Tetris;
