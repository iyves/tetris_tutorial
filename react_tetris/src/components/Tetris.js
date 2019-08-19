import React from 'react';

// Components
import Display from './Display';
import StartButton from './StartButton';
import Stage from './Stage'; 

const Tetris = () => {
  
  return(
    <div>
      <Stage />
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
