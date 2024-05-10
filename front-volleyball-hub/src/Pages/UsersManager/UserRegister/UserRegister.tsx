import React, { useState, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Container, LoginForm, Title, Input, Button, Label } from "./Styles";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import useUserType from "../../utils/apiUtils";
import Navbar from "../../../components/SideBard/SideBar";
import fetchUserType from "../../utils/apiUtils";

const apiUrl = process.env.REACT_APP_API_URL;

type FormData = {
  nome: string;
login: string;
  password: string;
  tipo: string;
 

};

const UserRegister: React.FC = () => {
  const { register, handleSubmit } = useForm<FormData>();

  const [userType, setUserType] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    fetchUserType().then(({ userType, isAuthenticated }) => {
      setUserType(userType);
      setIsAuthenticated(isAuthenticated);
    });
    
  }, []);

  const onSubmit = async (data: any) => {
    try {
      // Verificar se o usuário está autenticado
      if (!isAuthenticated) {
        toast.error(
          "Você precisa estar autenticado para realizar esta operação."
        );
        return;
      }

      // Verificar se o tipo de usuário é administrador
      if (userType === "administrador") {
        const formData = new FormData();
        formData.append("nome", data.nome);
        formData.append("password", data.password);
        formData.append("login", data.login); formData.append("tipo", data.tipo);

        const response = await axios.post(`${apiUrl}/cadastrar`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        if (response.status === 201) {
          toast.success("Cadastro realizado com sucesso!");
        } else {
          toast.error(
            "Erro ao fazer cadastro. Por favor, tente novamente mais tarde."
          );
        }
      } else {
        toast.error("Você não tem permissão para realizar esta operação.");
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
          <Title>Cadastrar Usuario</Title>
          <Input type="text" {...register("nome")} placeholder="Nome" />
          <Input type="text" {...register("login")} placeholder="Login" />
          <Input
            type="password"
            {...register("password")}
            placeholder="Senha"
          />
    <select {...register("tipo")}>
            <option value="usuario">Usuário</option>
            <option value="administrador">Administrador</option>
          </select>
          <Button type="submit">Cadastrar</Button>
        </LoginForm>
      </Container>
    </>
  );
};

export default UserRegister;
