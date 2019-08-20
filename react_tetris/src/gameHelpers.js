export const STAGE_WIDTH = 12;
export const STAGE_HEIGHT = 20;

export const createStage = () => 
  Array.from(Array(STAGE_HEIGHT), () =>
    new Array(STAGE_WIDTH).fill([0, 'clear'])   
  )

export const checkCollision = (player, stage, {x: moveX, y: moveY}) => { // Renaming x and y to moveX and moveY so we can use x&y in loops
  let height = player.tetromino.length;
  let width = player.tetromino[0].length;
  for (let y = 0; y < height; y += 1) {
    for (let x = 0; x < width; x += 1) { 
      // Check that we are on a tetromino
      if (player.tetromino[y][x] !== 0) {
        let targetY = y + player.pos.y + moveY;  
        let targetX = x + player.pos.x + moveX;
        
        if ( 
          !stage[targetY] || // Is in vertical bounds of stage
          !stage[targetY][targetX] || // Is in horizontal bounds of stage
          stage[targetY][targetX][1] !== 'clear' // Is a clear space
        ) { return true; }
      }
    }
  }
}
