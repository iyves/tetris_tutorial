import React from 'react';
import { StyledCell } from './styles/StyledCell';
import { TETROMINOS } from '../tetrominos';

// The {} are props
const Cell = ({ type }) => (
  <StyledCell type={type} color={TETROMINOS[type].color} />
)

// Memoizes this so that we only refresh cells that move
export default React.memo(Cell);
