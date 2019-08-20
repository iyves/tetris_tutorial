import { useState } from 'react';

import { randomTetromino } from '../tetrominos';

export const usePlayer = () => {
  const [player, setPlayer] = useState({
    pos: {x: 0, y: 0},
    tetromino: randomTetromino().shape,
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

  return [player]; // Q: Why do I have to return player as a list?
}
