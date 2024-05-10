import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Navbar from "../../components/SideBard/SideBar";
import fetchUserType from "../../Pages/utils/apiUtils";
import { StudentContainer, Button, ContentContainer, EmptyMessage } from "./Styles";

const apiUrl = process.env.REACT_APP_API_URL;

const UserAdmin: React.FC = () => {
  const [users, setUsers] = useState([]);
  const [userType, setUserType] = useState("");

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    fetchUserType().then(({ userType, isAuthenticated }) => {
      setUserType(userType);
      setIsAuthenticated(isAuthenticated);
    });

    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem("@VolleyHub:token"); // Obter token do localStorage
        const response = await axios.get(`${apiUrl}/usuarios`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUsers(response.data);
      } catch (error) {
        toast.error("Erro ao carregar lista de estudantes.");
      }
    };

    fetchUsers();
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
      });
      setUsers(users.filter((user: any) => user.id !== id));
      toast.success("Estudante deletado com sucesso.");
    } catch (error) {
      toast.error("Erro ao deletar estudante.");
    }
  };

  return ( <div>
    <Navbar />
    <ContentContainer>
      {users.length > 0 ? (
        users.map((user: any) => (
          <StudentContainer key={user.id}>
            <p>Nome: {user.nome}</p>
            <p>Login: {user.login}</p>
            <p>Tipo: {user.tipo}</p>
            <p>Cadastrado em: {user.created}</p>
            {userType === "administrador" && (
              <Button onClick={() => handleDelete(user.id)}>Deletar</Button>
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

export default UserAdmin;
