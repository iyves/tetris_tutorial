export const STAGE_WIDTH = 12;
export const STAGE_HEIGHT = 20;

export const createStage = () => 
  Array.from(Array(STAGE_HEIGHT), () =>
    new Array.fill(STAGE_WIDTH, [0, 'clear'])   
  )
