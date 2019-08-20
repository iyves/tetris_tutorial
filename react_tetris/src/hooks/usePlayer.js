import { useState, useCallback } from 'react';

import { TETROMINOS, randomTetromino } from '../tetrominos';
import { STAGE_WIDTH } from '../gameHelpers';

export const usePlayer = () => {
  const [player, setPlayer] = useState({
    pos: {x: 0, y: 0},
    tetromino: TETROMINOS[0].shape, // So that the first generated tetromino (before StartGameButton is pressed) is empty
    collided: false,    // Is ending with a comma standard? Even if there are no more items?
  });

  /* 
      cosnt [player, setPlayer] = useState();
    Is equivalent to
      const playerState = useState();
      const player = playerState[0];
      const setPlayer = playerState[1];

      ES6 allows us to simplify! :D
  */

  const updatePlayerPos = ({x, y, collided}) => {
    // Need parens around curly braces so ES6 doesn't confuse the function for being a part of the block
    setPlayer(prev => ({ 
      ...prev, // IDK why we have a spread here, or where prev is coming from but OK
      pos: {x: (prev.pos.x += x), y: (prev.pos.y += y)},
    }));
  }

  const resetPlayer = useCallback(() => { // Prevents game from infinitely looping
    setPlayer({
      pos: {x: STAGE_WIDTH / 2 - 2, y: 0},
      tetromino: randomTetromino().shape,
      collided: false,
    });
  }, []);

  return [player, updatePlayerPos, resetPlayer]; // Q: Why do I have to return player as a list?
}
