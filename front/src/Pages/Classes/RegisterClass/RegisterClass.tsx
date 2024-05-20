import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { toast } from "react-toastify";
import {
  Container,
} from "./Styles";
import { RegisterForm
  ,

  Title,
  Input,
  Button,
  Label,
  ErrorText, 
  LabelInput} from "../../../components/RegisterForm";
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
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      const formData = new FormData();
      formData.append("titulo", data.titulo);
      formData.append("horario", data.horario);
      formData.append("professor", data.professor);
    

      const token = localStorage.getItem("@VolleyHub:token");

      const response = await axios.post(`${apiUrl}/turmas`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 201) {
        toast.success("Cadastro realizado com sucesso!");
      } else {
        toast.error(
          "Erro ao fazer cadastro. Por favor, tente novamente  tarde."+ response.data.mensagens
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
      <Navbar />
      <Container>
        <RegisterForm onSubmit={handleSubmit(onSubmit)}>
          <Title>Cadastrar Turmas</Title>
          <LabelInput>
          <Label>Nome da Turma:</Label>
          <Input
            type="text"
            {...register("titulo", { required: "Nome da turma é obrigatório" })}
            placeholder="Nome da turma"
          />
          {errors.titulo && <ErrorText>{errors.titulo.message}</ErrorText>}
          </LabelInput>
          <LabelInput>
          <Label>Horário:</Label>
          <Input
            type="text"
            {...register("horario", { required: "Horário é obrigatório" })}
            placeholder="Horário"
          />
          {errors.horario && <ErrorText>{errors.horario.message}</ErrorText>}
          </LabelInput>
          <LabelInput>
          <Label>Professor:</Label>
          <Input
            type="text"
            {...register("professor", { required: "Nome do professor é obrigatório" })}
            placeholder="Nome do Professor"
          />
          {errors.professor && <ErrorText>{errors.professor.message}</ErrorText>}
          </LabelInput>
          <Button type="submit">Cadastrar</Button>
        </RegisterForm>
      </Container>
    </>
  );
};

export default RegisterClass;