import React, { useState, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Container, LoginForm, Title, Input, Button, Label, Select } from "./Styles";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import useUserType from "../../utils/apiUtils";
import Navbar from "../../../components/SideBard/SideBar";
import fetchUserType from "../../utils/apiUtils";

const apiUrl = process.env.REACT_APP_API_URL;

type FormData = {
  nome: string;
  password: string;
  image: File;
  data_nascimento: string;
  endereco: string;
  nome_escola: string;
  plano_saude: boolean;
  detalhes_plano_saude: string;
  hospital_preferido: string;
  nome_responsavel: string;
  telefone_responsavel: string;
  atestado_medico: string;
  termo_conduta: string;
  direitos_imagem: string;
  id_turma: string;
};

const RegisterStudents: React.FC = () => {
  const { register, handleSubmit, watch } = useForm<FormData>();
  const [turmas, setTurmas] = useState<any[]>([]);
  const [userType, setUserType] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showDetalhesPlanoSaude, setShowDetalhesPlanoSaude] = useState(false);
  useEffect(() => {
    fetchUserType().then(({ userType, isAuthenticated }) => {
      setUserType(userType);
      setIsAuthenticated(isAuthenticated);
    });
    const fetchTurmas = async () => {
      try {
        const token = localStorage.getItem("@VolleyHub:token");
        const response = await axios.get(`${apiUrl}/turmas`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setTurmas(response.data);
      } catch (error) {
        toast.error("Erro ao carregar turmas.");
      }
    };

    fetchTurmas();
  }, []);

  const onSubmit = async (data: any) => {
    const token = localStorage.getItem("@VolleyHub:token");
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

        formData.append("data_nascimento", data.data_nascimento);
        formData.append("endereco", data.endereco);
        formData.append("nome_escola", data.nome_escola);
        formData.append("plano_saude", data.plano_saude ? "1" : "0");
        formData.append("detalhes_plano_saude", data.detalhes_plano_saude);
        formData.append("id_turma", data.id_turma);
        formData.append("hospital_preferido", data.hospital_preferido);
        formData.append("nome_responsavel", data.nome_responsavel);
        formData.append("telefone_responsavel", data.telefone_responsavel);
       
        if (data.atestado_medico.length > 0) {
          formData.append("atestado_medico", data.atestado_medico[0]);
      }
      if (data.termo_conduta.length > 0) {
          formData.append("termo_conduta", data.termo_conduta[0]);
      }
      if (data.direitos_imagem.length > 0) {
          formData.append("direitos_imagem", data.direitos_imagem[0]);
      }
        const response = await axios.post(`${apiUrl}/alunos`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",

            Authorization: `Bearer ${token}`,
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
  const handlePlanoSaudeChange = () => {
    setShowDetalhesPlanoSaude(!showDetalhesPlanoSaude);
  };
  return (
    <>
      {" "}
      <Navbar />
      <Container>
      <LoginForm onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
          <Title>Cadastrar Aluno</Title>
          <Input type="text" {...register("nome")} placeholder="Nome" />
          <Input
            type="date"
            {...register("data_nascimento")}
            placeholder="Data de Nascimento"
          />
          <Input type="text" {...register("endereco")} placeholder="Endereço" />
          <Input
            type="text"
            {...register("nome_escola")}
            placeholder="Nome da Escola"
          />{" "}
        
         
            <Select {...register("id_turma")}>
              <option value="">Escolha a turma</option>
              {turmas.map((turma) => (
                <option key={turma.id} value={turma.id}>
                  {`${turma.titulo} - ${turma.horario}`}
                </option>
              ))}
            </Select>
         
          <Input
            type="text"
            {...register("nome_responsavel")}
            placeholder="Nome do Responsável"
          />
          <Input
            type="text"
            {...register("telefone_responsavel")}
            placeholder="Telefone do Responsável"
          />
         
          <Input
            type="file"
            accept=".pdf, .png, .jpg, .jpeg"
            {...register("termo_conduta")}
            placeholder="Termo de Conduta"
          />
          <Input
            type="file"
            accept=".pdf, .png, .jpg, .jpeg"
            {...register("direitos_imagem")}
            placeholder="Direitos de Imagem"
          />
          <Label>
            Plano de Saúde:
            <Input
              type="checkbox"
              {...register("plano_saude")}
              onChange={handlePlanoSaudeChange}
            />
          </Label>
          {watch("plano_saude") && (
            <Input
              type="text"
              {...register("detalhes_plano_saude")}
              placeholder="Detalhes do Plano de Saúde"
            />
          )}
          <Input
            type="text"
            {...register("hospital_preferido")}
            placeholder="Hospital Preferido"
          />
          <Button type="submit">Cadastrar</Button>
        </LoginForm>
      </Container>
    </>
  );
};

export default RegisterStudents;
