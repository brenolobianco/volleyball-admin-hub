import styled from 'styled-components';

export const PageContainer = styled.div`
  display: flex;
 
`;



export const Container = styled.div`
  width: 55%;
  padding: 20px;
  margin-left:250px;
`;

export const StudentContainer = styled.div`
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
`;

export const StudentHeader = styled.div`
  background-color: #f0f0f0;
  border-bottom: 1px solid #ddd;
  padding: 10px;
  border-radius: 8px 8px 0 0;
`;

export const StudentDetails = styled.div`
  padding: 20px;
  border-bottom: 1px solid #ddd;
`;

export const Button = styled.button`
  background-color: #dc3545;
  color: #fff;
  border: none;
  border-radius: 4px;
  padding: 8px 16px;
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
