import React from 'react';

// Components
import Display from './Display';
import StartButton from './StartButton';
import Stage from './Stage'; 

import { StyledTetrisWrapper, StyledTetris } from './styles/StyledTetris';
import { createStage } from '../gameHelpers';

const Tetris = () => {
  
  return(
    <StyledTetrisWrapper>
      <StyledTetris> 
        <Stage stage={createStage()}/>
        <aside>
          <div>
            <Display text="Score" />
            <Display text="Rows" />
            <Display text="Level" />
          </div>
          <StartButton />
        </aside>
      </StyledTetris> 
    </StyledTetrisWrapper>
  )
}

export default Tetris;
