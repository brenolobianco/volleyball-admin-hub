import React, { useState,useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Container, LoginForm, Title, Input, Button, Label } from "./Styles";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

import Navbar from "../../../components/SideBard/SideBar";
const apiUrl = process.env.REACT_APP_API_URL;

type FormData = {
  titulo: string;
  horario: string;
  professor: string;
};

const RegisterClass: React.FC = () => {
  const { register, handleSubmit } = useForm<FormData>();



  const onSubmit = async (data: any) => {
    try {
      const formData = new FormData();
      formData.append("titulo", data.titulo);
      formData.append("horario", data.horario);
      formData.append("professor", data.professor);
  
      const token = localStorage.getItem("@VolleyHub:token"); // Supondo que o token JWT esteja armazenado no localStorage
  
      const response = await axios.post(`${apiUrl}/turmas`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`, // Adiciona o token de autorização ao cabeçalho
        },
      });
  
      if (response.status === 201) {
        toast.success("Cadastro realizado com sucesso!");
      } else {
        toast.error(
          "Erro ao fazer cadastro. Por favor, tente novamente mais tarde."
        );
      }
    } catch (error) {
      toast.error(
        "Erro ao fazer cadastro. Por favor, tente novamente mais tarde."
      );
    }
  };
  

  return (
    <>
      {" "}
      <Navbar />
      <Container>
        <LoginForm onSubmit={handleSubmit(onSubmit)}>
          <Title>Cadastrar Turmas</Title>
          <Input type="text" {...register("titulo")} placeholder="Titulo" />
          <Input type="string" {...register("horario")} placeholder="Horario" />
          <Input
            type="text"
            {...register("professor")}
            placeholder="professor"
          />

          <Button type="submit">Cadastrar</Button>
        </LoginForm>
      </Container>
    </>
  );
};

export default RegisterClass;
