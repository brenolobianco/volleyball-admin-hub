import styled from 'styled-components';
import { Link } from 'react-router-dom'; // Assuming you're using react-router for navigation

export const PageContainer = styled.div`
  display: flex;
  background-color: #f5f5f5;
  min-height: 100vh;
`;

export const Container = styled.div`
  width: 70%;
  padding: 20px;
  margin-left: 250px;
  margin-top: 50px;
`;

export const StudentContainer = styled.div`
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 8px;
  margin-bottom: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s, box-shadow 0.2s;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
  }
`;

export const StudentHeader = styled.div`
  background-color: #f0f0f0;
  border-bottom: 1px solid #ddd;
  padding: 20px;
  border-radius: 8px 8px 0 0;
  display: flex;
  justify-content: space-between;
  align-items: center;

  h2 {
    margin: 0;
    font-size: 1.2rem;
    font-weight: 500;
    color: #333;
  }
`;

export const StudentDetails = styled.div`
  padding: 20px;
  background-color: #f9f9f9;
  border-bottom: 1px solid #ddd;
  border-radius: 0 0 8px 8px;

  p {
    margin: 10px 0;
    font-size: 1rem;
    line-height: 1.6;
    color: #555;
  }

  strong {
    color: #333;
    font-weight: 600;
  }

  button {
    background-color: #007bff;
    color: #fff;
    border: none;
    padding: 8px 16px;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s ease;
    margin: 5px 0;

    &:hover {
      background-color: #0056b3;
    }
  }
`;

export const Button = styled.button`
  background-color: #007bff;
  color: #fff;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056b3;
  }
`;

export const EmptyMessage = styled.p`
  color: #999;
  font-style: italic;
  margin-top: 20px;
`;

export const Pagination = styled.nav`
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
      color: #fff;
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
        color: #fff;
      }
    }
  }
`;