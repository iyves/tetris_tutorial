import styled from 'styled-components';

export const StyledStage= styled.div`
  display: grid;
  grid-template-rows: repeat(
    ${props => props.height} ,
    calc(50vmin / ${props => props.width})
  );
  grid-template-columns: repeat(${props => props.width}, 1fr);
  grid-gap: 1px;
  border: 2px solid #333;
  width: 100%;
  max-width: 50vmin;
  background: #111;
`;
