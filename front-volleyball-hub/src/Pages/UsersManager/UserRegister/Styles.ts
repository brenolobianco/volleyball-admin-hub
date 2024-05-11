import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
 height: 100vh;
`;

export const RegisterForm = styled.form`
  width: 482px;
margin-top: 40px;
  background: rgba(255, 255,240, 0.5);

  border-radius: 10px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  justify-content: center;
  align-items: center;

  padding: 38px;

  box-shadow: 0 8px 20px 0 ;
  backdrop-filter: blur(8.5px);
  -webkit-backdrop-filter: blur(8.5px);
  border-radius: 10px;
  color: black;
  text-transform: uppercase;
  letter-spacing: 0.2rem;
`;

export const Title = styled.h2`
  font-size: 22px;
`;

export const Input = styled.input`
  background: rgba(255, 255, 255, 0.15);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  border-radius: 2rem;
  width: 100%;

  padding: 13px;
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
export const InputImage = styled.input`
  background: rgba(255, 255, 255, 0.15);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  border-radius: 2rem;

  padding: 1rem;
  border: none;
  outline: none;
  color: #3c354e;
  font-size: 15px;
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
export const Select = styled.select`
  background: rgba(255, 255, 255, 0.15);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  border-radius: 2rem;
  width: 110%;
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
`;

export const Option = styled.option`
  color: #3c354e;
  font-size: 1rem;
  font-weight: bold;
`;
export const Label = styled.label`
  color: #3c354e;
  font-size: 12px;
  font-weight: bold;
`;
export const Button = styled.button`
  background: linear-gradient(to right, #14163c 0%, #03217b 79%);
  text-transform: uppercase;
  letter-spacing: 0.2rem;
  width: 65%;
  height: 3rem;
  border: none;
  color: white;
  border-radius: 2rem;
  cursor: pointer;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;
export const ButtonNavigate = styled.button`
  font-size: 16px;
  border: none;
  cursor: pointer;
  background: rgba(255, 255, 285, 0.15);
  padding: 1rem;
  border-radius: 2rem;
  width: 65%;

  &:hover {
    background-color: #0056b3;
  }
`;
export const ErrorText = styled.p`
  color: #ff0000;
  font-size: 14px;
  margin-top: 10px;
`;
