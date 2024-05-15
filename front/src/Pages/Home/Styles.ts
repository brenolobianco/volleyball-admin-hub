// Styles.js
import styled from 'styled-components';


export const AppContainer = styled.div`
  display: flex;
  flex-direction: column; 
  justify-content: space-between;
  align-items: center;
  min-height: 100vh; 
 
`;

export const ColumnContainer = styled.div`
  flex-grow: 1;
  flex-basis: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-right: 20px;
margin-top:80px ;
  width:100vh ;
 
`;


export const EmptyMessage = styled.p`
  color: #999999;
  font-style: italic;
  margin-top: 20px;
`;


export const Button = styled.button`
  background: linear-gradient(to right, #14163c 0%, #03217b 79%);
  text-transform: uppercase;
  letter-spacing: 0.2rem;
 margin-bottom:30px ;
 margin-left: 10px;
  height: 25px;
  border: none;
  color: white;
  border-radius: 2rem;
  cursor: pointer;
  &:hover {
    background-color: #0056b3;
  }
`;



export const ColumnTitle = styled.h2`
  font-size: 20px;
  margin-bottom: 10px;
`;







