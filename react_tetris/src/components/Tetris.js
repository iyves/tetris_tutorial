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

import { createStage } from '../gameHelpers';


const Tetris = () => {
  
  const [dropTime, setDropTime] = useState(null);
  const [gameOver, setGameOver] = useState(false);

  const [player, updatePlayerPos, resetPlayer] = usePlayer();
  const [stage, setStage] = useStage(player);

  console.log('re-render');
  
  const movePlayer = dir => {
    updatePlayerPos({x: dir, y: 0});
  }

  const startGame = () => {
    setStage(createStage());
    resetPlayer();
  }

  const drop = () => {
    updatePlayerPos({x: 0, y: 1, collided: "false"});
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
