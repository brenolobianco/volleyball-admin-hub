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

export const ModalContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 600px;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;
  gap: 20px;
  border-radius: 8px;
  z-index: 1000;
`;

export const ModalContent = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  max-width: 400px;
`;

export const ModalTitle = styled.h2`
  font-size: 20px;
  margin-bottom: 20px;
`;

export const ModalInput = styled.input`
  background: rgba(255, 255, 255, 0.60);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  border-radius: 2rem;
  width: 80%;
  padding: 1rem;
  border: none;
  outline: none;
  color: #3c354e;
  font-size: 1rem;
  font-weight: bold;
  &:focus {
    display: inline-block;
    box-shadow: 0 0 0 0.2rem #b9abe0;
    backdrop-filter: blur(12rem);
    border-radius: 2rem;
  }
  &::placeholder {
    color: #3c354e;
    font-weight: 100;
    font-size: 1rem;
  }
`;


export const ModalTextArea = styled.textarea`
  background: rgba(255, 255, 255, 0.60);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  border-radius: 2rem;
  width: 80%;
  height: 100px;
  padding: 1rem;
  border: none;
  outline: none;
  color: #3c354e;
  font-size: 1rem;
  font-weight: bold;
  resize: vertical;
  &:focus {
    display: inline-block;
    box-shadow: 0 0 0 0.2rem #b9abe0;
    backdrop-filter: blur(12rem);
    border-radius: 2rem;
  }
  &::placeholder {
    color: #3c354e;
    font-weight: 100;
    font-size: 1rem;
  }
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

export const ModalButton = styled.button`
  background: linear-gradient(to right, #14163c 0%, #03217b 79%);
  text-transform: uppercase;
  letter-spacing: 0.2rem;
  width: 65%;
  height: 3rem;
  border: none;
  color: white;
  border-radius: 2rem;
  cursor: pointer;
  &:hover {
    background-color: #0056b3;
  }
`;

export const ModalCancelButton = styled.button`
  text-transform: uppercase;
  letter-spacing: 0.2rem;
  width: 65%;
  height: 3rem;
  border: none;
  border-radius: 2rem;
  cursor: pointer;
  &:hover {
    background-color: #dc3545;
  }
`;

export const ProjectItem = styled.div`
  margin-bottom: 20px;
  padding: 20px;
  border-radius: 8px;
  background-color: #f0f0f0;
  width: 100%;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

export const ProjectTitle = styled.h3`
  color: #333;
  font-size: 20px;
  margin-bottom: 10px;
`;

export const ProjectDescription = styled.p`
  color: #666;
  margin-bottom: 10px;
`;

export const ProjectPrice = styled.p`
  color: #007bff;
  font-weight: bold;
`;

export const ViewDetailsButton = styled.button`
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  padding: 10px 20px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  &:hover {
    background-color: #0056b3;
  }
`;

export const Separator = styled.hr`
  border: none;
  border-top: 1px solid #ccc;
  margin: 20px 0;
`;

export const ColumnTitle = styled.h2`
  font-size: 20px;
  margin-bottom: 10px;
`;


export const ModalProposalContainer = styled.div`
 position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 600px;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;
  gap: 20px;
  border-radius: 8px;
  z-index: 1000;
`;



export const ProposalInfo = styled.div`
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
`;

export const ProposalButton = styled.button`
  background-color: #007bff;
  color: #fff;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;





