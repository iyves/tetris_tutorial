import React from 'react';

// Components
import Display from './Display';
import StartButton from './StartButton';
import Stage from './Stage'; 

import createStage from '../gameHelpers';

const Tetris = () => {
  
  return(
    <div>
      <Stage stage={createStage()}/>
      <aside>
        <div>
          <Display text="Score" />
          <Display text="Rows" />
          <Display text="Level" />
        </div>
        <StartButton />
      </aside>
    </div>
  );
};

export default Tetris;