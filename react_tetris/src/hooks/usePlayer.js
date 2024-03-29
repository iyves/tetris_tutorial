import { useState, useCallback } from 'react';

import { TETROMINOS, randomTetromino } from '../tetrominos';
import { STAGE_WIDTH, checkCollision } from '../gameHelpers';

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
      collided,
    }));
  }

  const resetPlayer = useCallback(() => { // Prevents game from infinitely looping
    setPlayer({
      pos: {x: STAGE_WIDTH / 2 - 2, y: 0},
      tetromino: randomTetromino().shape,
      collided: false,
    });
  }, []);

  const rotate = (matrix, dir) => {
    // Turns rows into cols
    const rotatedTetro = matrix.map((_, index) => 
      matrix.map(col => col[index])  
    );
 
    // Rotate clockwise
    if (dir > 0) return rotatedTetro.map(row => row.reverse());
    // Rotate counter-clockwise
    return rotatedTetro.reverse();
  }

  const playerRotate = (stage, dir) => {
    const playerCopy = JSON.parse(JSON.stringify(player));
    playerCopy.tetromino = rotate(playerCopy.tetromino, dir);

    const pos = playerCopy.pos.x;
    let offset = 1;

    // If rotation would cause collision, see if moving rotated over would remove collision
    //  moves rotated tetromino to right and then to left until moving exceeds width of tetromino
    while (checkCollision(playerCopy, stage, {x: 0, y: 0})) {
      playerCopy.pos.x += offset;
      offset = -(offset + (offset > 0 ? 1 : -1));
      
      if (offset > playerCopy.tetromino[0].length) return;
    }
    

    setPlayer(playerCopy);
  }

  // Q: Why do I have to return player as a list?
  // A: I think it has to do with public vs private, whatever you return in the following is public
  return [player, updatePlayerPos, resetPlayer, playerRotate]; 
}
