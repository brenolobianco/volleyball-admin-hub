// Styles.js
import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column; /* Alterado para row para que o StudentContainer ocupe a direita */
  justify-content: center; /* Para alinhar os itens à esquerda */
  align-items: center; /* Para alinhar os itens ao topo */
`;
export const AppContainer = styled.div`
  display: flex;
  flex-direction: column; 
  justify-content: space-between;
  align-items: center;
  max-height: 100vh; 
 
`;
export const StudentContainer = styled.div`
  padding: 20px;
  margin-top: 150px;
  border: 1px solid #ccc;
  margin-bottom: 10px;
`;

export const Button = styled.button`
  margin-right: 10px;
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





