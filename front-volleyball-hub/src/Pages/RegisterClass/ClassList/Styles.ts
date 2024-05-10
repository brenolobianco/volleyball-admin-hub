import styled from 'styled-components';

export const ContentContainer = styled.div`
  display: flex;
  flex-direction: column; /* Alterado para row para que o StudentContainer ocupe a direita */
  justify-content: center; /* Para alinhar os itens à esquerda */
  align-items: center; /* Para alinhar os itens ao topo */
  flex-grow: 1; /* Para que o ContentContainer ocupe todo o espaço disponível */
`;

export const StudentContainer = styled.div`
  padding: 20px;

  border: 1px solid #ccc;
  margin-bottom: 10px;
  background-color: #f5f5f5;
`;

export const Button = styled.button`
  margin-right: 10px;
`;

export const EmptyMessage = styled.p`
  color: #999999;
  font-style: italic;
  margin-top: 20px;
`;
