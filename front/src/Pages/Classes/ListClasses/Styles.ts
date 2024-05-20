import styled from 'styled-components';
import { FaTrash } from 'react-icons/fa';

export const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #f8f9fa;
  min-height: 100vh;
  padding: 20px;
`;

export const ContentContainer = styled.div`
  width: 90%;
  max-width: 800px;
  margin-top: 40px;

  @media (min-width: 768px) {
    width: 80%;
  }

  @media (min-width: 992px) {
    width: 60%;
  }
`;

export const ListContainer = styled.div`
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
  transition: transform 0.2s, box-shadow 0.2s;

  &:hover {
    transform: none;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
`;

export const ListHeader = styled.div`
  background-color: #f8f9fa;
  border-bottom: 1px solid #ddd;
  padding: 15px;
  border-radius: 12px 12px 0 0;
  color: #000000;

  h2 {
    margin: 0;
    font-size: 1rem;
    font-weight: normal;
  }
`;

export const ListItem = styled.div`
  padding: 15px;
  border-bottom: 1px solid #eee;
  display: flex;
  flex-direction: column;
  gap: 10px;

  &:last-child {
    border-bottom: none;
  }

  p {
    margin: 0;
    font-size: 0.9rem;
  }

  strong {
    color: #000000;
  }

  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
`;

export const Button = styled.button`
  background-color: #dc3545;
  color: #ffffff;
  border: none;
  border-radius: 4px;
  padding: 8px 16px;
  width: 75px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #c82333;
  }

  svg {
    margin-right: 5px;
  }
`;

const Pagination = styled.nav`
  display: flex;
  justify-content: center;
  margin-top: 20px;

  .pagination {
    display: flex;
    list-style: none;
    gap: 10px;
  }

  .page-item {
    &.active .page-link {
      background-color: #007bff;
      color: #ffffff;
      border: none;
    }

    .page-link {
      background-color: #f8f9fa;
      color: #007bff;
      border: 1px solid #007bff;
      padding: 8px 12px;
      border-radius: 4px;
      cursor: pointer;
      transition: background-color 0.3s ease, color 0.3s ease;

      &:hover {
        background-color: #007bff;
        color: #ffffff;
      }
    }
  }

  @media (max-width: 576px) {
    .pagination {
      flex-direction: column;
      align-items: center;
      gap: 5px;
    }

    .page-link {
      padding: 6px 10px;
    }
  }
`;
