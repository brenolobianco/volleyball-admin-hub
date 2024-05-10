import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Navbar from "../../../components/SideBard/SideBar";
import fetchturmaType from "../../utils/apiUtils";
import { StudentContainer, Button, ContentContainer, EmptyMessage } from "./Styles";

const apiUrl = process.env.REACT_APP_API_URL;

const ListClass: React.FC = () => {
  const [turmas, setTurmas] = useState([]);
  const [userType, setUserType] = useState("");

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    fetchturmaType().then(({ userType, isAuthenticated }) => {
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

  const handleDelete = async (id: number) => {
    try {
      const token = localStorage.getItem("@VolleyHub:token");

      // Verificar se o tipo de usuário é administrador
      if (userType !== "administrador") {
        toast.error("Você não tem permissão para realizar esta operação.");
        return;
      }

      await axios.delete(`${apiUrl}/usuarios/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });setTurmas(turmas.filter((turma: any) => turma.id !== id));
      toast.success("Estudante deletado com sucesso.");
    } catch (error) {
      toast.error("Erro ao deletar estudante.");
    }
  };

  return ( <div>
    <Navbar />
    <ContentContainer>
      {turmas.length > 0 ? (
        turmas.map((turma: any) => (
          <StudentContainer key={turma.id}>
            <p>Nome: {turma.titulo}</p>
            <p>Login: {turma.login}</p>
            <p>Tipo: {turma.tipo}</p>
            <p>Cadastrado em: {turma.created}</p>
            {userType === "administrador" && (
              <Button onClick={() => handleDelete(turma.id)}>Deletar</Button>
            )}
          </StudentContainer>
        ))
      ) : (
        <EmptyMessage>Nenhum usuário encontrado.</EmptyMessage>
      )}
    </ContentContainer>
  </div>
  );
};

export default ListClass;
