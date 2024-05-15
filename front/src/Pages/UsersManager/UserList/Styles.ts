import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 80%;
  margin: 0 auto;
  padding: 20px;
  background-color: #f5f5f5;
  min-height: 100vh;
`;

export const StudentContainer = styled.div`
  width: 100%;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 20px;
  margin-bottom: 20px;
  transition: transform 0.2s, box-shadow 0.2s;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
  }

  p {
    margin: 10px 0;
    font-size: 1rem;
    color: #333;

    strong {
      color: #000;
    }
  }
`;

export const Button = styled.button`
  background: linear-gradient(to right, #14163c 0%, #03217b 79%);
  color: #fff;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  margin-top: 10px;

  &:hover {
    background-color: #0056b3;
  }
`;

export const EmptyMessage = styled.p`
  color: #999999;
  font-style: italic;
  margin-top: 20px;
`;

export const PaginationContainer = styled.ul`
  display: flex;
  list-style: none;
  padding: 0;
  margin: 20px 0;
  gap: 10px;
`;

export const PaginationItem = styled.li<{ active: boolean }>`
  .page-link {
    background-color: ${({ active }) => (active ? '#007bff' : '#f8f9fa')};
    color: ${({ active }) => (active ? '#fff' : '#007bff')};
    border: 1px solid #007bff;
    padding: 8px 12px;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s ease, color 0.3s ease;

    &:hover {
      background-color: #007bff;
      color: #fff;
    }
  }
`;

export const PaginationLink = styled.button`
  background: none;
  border: none;
  cursor: pointer;
`;
