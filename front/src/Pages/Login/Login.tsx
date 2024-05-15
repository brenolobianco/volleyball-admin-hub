import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import {
  Container,
  LoginForm,
  Title,
  Input,
  Button,
  ErrorText,
} from "./Styles";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


type FormData = {
  login: string;
  password: string;
};

const LoginPage: React.FC = () => {
  const { register, handleSubmit } = useForm<FormData>();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const apiUrl = process.env.REACT_APP_API_URL;
  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try { 
      const response = await fetch(`${apiUrl}/login`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const json = await response.json();
     
      if (response.ok) {
        const token = json.token;
        localStorage.setItem("userId", json.usuario.id);
        localStorage.setItem("@VolleyHub:token", token);
        localStorage.setItem("userType", json.usuario.tipo);
        localStorage.setItem("UserName", json.usuario.nome);
  setTimeout(() => {
    navigate("/dashboard");
  },2000)
     
        toast.success("Login realizado com sucesso!");
      } else {
        setError("Credenciais inválidas");
        toast.error("Credenciais inválidas");
      }
    } catch (error) {
      console.error("Erro ao fazer login:", error);
      toast.error(
        "Erro ao fazer login. Por favor, tente novamente mais tarde."
      );
    }
  };
  return (
    <Container>
      <LoginForm onSubmit={handleSubmit(onSubmit)}>
        <Title>Login</Title>
        <Input type="login" {...register("login")} placeholder="Login" />
        <Input type="password" {...register("password")} placeholder="Senha" />
        <Button type="submit">Entrar</Button>
      
        {error && <ErrorText>{error}</ErrorText>}
      </LoginForm>
    </Container>
  );
};

export default LoginPage;
