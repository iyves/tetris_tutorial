import { useState, useEffect, useCallback } from 'react';

export const useGameStatus = rowsCleared => {
  const [score, setScore] = useState(0);
  const [rows, setRows] = useState(0);
  const [level, setLevel] = useState(0);

  const linePoints = [40, 100, 300, 1200];

  const calcScore = useCallback(() => {
    if (rowsCleared > 0) {
      setScore(prev => prev + linePoints[rowsCleared - 1] * (level + 1));
      setRows(prev => prev + rowsCleared);
    }
  // Because this is a callback function, it has to have a dependency array
  // these three items must change, or else function will not happen. This prevents inf loop
  }, [level, linePoints, rowsCleared]); 
  

  // Because we want this to fire off automatically. I'm not sure what useEffect does though, so TODO
  useEffect(() => {
    calcScore();
  }, [calcScore, rowsCleared, score]);
  
  return [score, setScore, rows, setRows, level, setLevel];
}
