import styled from 'styled-components';

export const PageContainer = styled.div`
  display: flex;

`;



export const Container = styled.div`
  width: 55%;
  padding: 2px;
  margin-left:250px;
  margin-top:50px ;
`;

export const StudentContainer = styled.div`
  background-color: #fff;



`;

export const StudentHeader = styled.div`
  background-color: #f0f0f0;
  border-bottom: 1px solid #ddd;
  padding: 5px;
  border-radius: 8px 8px 0 0;
  display:flex ;
  justify-content: space-between;
`;

export const StudentDetails = styled.div`

  border-bottom: 1px solid #ddd;
`;

export const Button = styled.button`
  background-color: #ff0000;
  color: #fff;
  border: none;
  height: 30px;
  width: 95px;
  border-radius: 4px;

  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #c82333;
  }
`;

export const EmptyMessage = styled.p`
  color: #999;
  font-style: italic;
  margin-top: 20px;
`;
