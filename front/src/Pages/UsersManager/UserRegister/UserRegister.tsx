import React, { useState, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { toast } from "react-toastify";
import { Container, Title, Input, Button,  Select, ErrorText, Label, LabelInput } from "../../../components/RegisterForm";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import Navbar from "../../../components/SideBard/SideBar";
import fetchUserType from "../../utils/apiUtils";
import { RegisterForm } from "../../../components/RegisterForm";	
const apiUrl = process.env.REACT_APP_API_URL;

type FormData = {
  nome: string;
  login: string;
  password: string;
  tipo: string;
};

const UserRegister: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();

  const [userType, setUserType] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    fetchUserType().then(({ userType, isAuthenticated }) => {
      setUserType(userType);
      setIsAuthenticated(isAuthenticated);
    });
  }, []);

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      if (!isAuthenticated) {
        toast.error("Você precisa estar autenticado para realizar esta operação.");
        return;
      }

      if (userType === "administrador") {
        const response = await axios.post(`${apiUrl}/cadastrar`, data, {
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (response.status === 201) {
          toast.success("Cadastro realizado com sucesso!");
        } else {
          toast.error("Erro ao fazer cadastro. Por favor, tente novamente mais tarde.");
        }
      } else {
        toast.error("Você não tem permissão para realizar esta operação.");
      }
    } catch (error) {
      toast.error("Erro ao fazer cadastro. Por favor, tente novamente mais tarde.");
    }
  };

  return (
    <>
      <Navbar />
      <Container>
        <RegisterForm onSubmit={handleSubmit(onSubmit)}>
          <Title>Cadastrar Usuário</Title>
          <LabelInput>
          <Label>Nome:</Label>
          <Input 
            type="text" 
            {...register("nome", { required: "Nome é obrigatório" })} 
            placeholder="Nome" 
          />
          {errors.nome && <ErrorText>{errors.nome.message}</ErrorText>}
          </LabelInput>
          <LabelInput>
          <Label>Login:</Label>
          <Input 
            type="text" 
            {...register("login", { required: "Login é obrigatório" })} 
            placeholder="Login" 
          />
          {errors.login && <ErrorText>{errors.login.message}</ErrorText>}
          </LabelInput>
          <LabelInput>
          <Label>Senha:</Label>
          <Input 
            type="password" 
            {...register("password", { 
              required: "Senha é obrigatória", 
              minLength: { value: 6, message: "Senha deve ter pelo menos 6 caracteres" }
            })} 
            placeholder="Senha" 
          />
          {errors.password && <ErrorText>{errors.password.message}</ErrorText>}    </LabelInput>
          <LabelInput>
          <Label>Tipo:</Label>
          <Select {...register("tipo", { required: "Tipo é obrigatório" })}>
            <option value="">Selecione um tipo</option>
            <option value="usuario">Usuário</option>
            <option value="administrador">Administrador</option>
          </Select>
          {errors.tipo && <ErrorText>{errors.tipo.message}</ErrorText>}
          </LabelInput>
          <Button type="submit">Cadastrar</Button>
        </RegisterForm>
      </Container>
    </>
  );
};

export default UserRegister;
