import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Navbar from "../../../components/SideBard/SideBar";
import fetchUserType from "../../utils/apiUtils";
import { StudentContainer, Button,  EmptyMessage, PaginationContainer, PaginationItem, PaginationLink } from "./Styles";
import { Container } from "../../Students/ListStudents/Styles";

const apiUrl = process.env.REACT_APP_API_URL;
const itemsPerPage = 5;

const UserAdmin: React.FC = () => {
  const [users, setUsers] = useState([]);
  const [userType, setUserType] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetchUserType().then(({ userType }) => {
      setUserType(userType);
    });

    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem("@VolleyHub:token");
        const response = await axios.get(`${apiUrl}/usuarios`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUsers(response.data);
      } catch (error) {
        toast.error("Erro ao carregar lista de usuários.");
      }
    };

    fetchUsers();
  }, []);

  const handleDelete = async (id: number) => {
    try {
      const token = localStorage.getItem("@VolleyHub:token");

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

      toast.success("Usuário deletado com sucesso.");
    } catch (error) {
      toast.error("Erro ao deletar usuário.");
    }
  };

  const totalPages = Math.ceil(users.length / itemsPerPage);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentUsers = users.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div>
      <Navbar />
      <Container>
        {currentUsers.length === 0 ? (
          <EmptyMessage>Nenhum usuário encontrado.</EmptyMessage>
        ) : (
          currentUsers.map((user: any) => (
            <StudentContainer key={user.id}>
              <p><strong>Nome:</strong> {user.nome}</p>
              <p><strong>Login:</strong> {user.login}</p>
              <p><strong>Tipo:</strong> {user.tipo}</p>
              <p><strong>Cadastrado em:</strong> {new Date(user.created_at).toLocaleDateString()}</p>
              {userType === "administrador" && (
                <Button onClick={() => handleDelete(user.id)}>Deletar</Button>
              )}
            </StudentContainer>
          ))
        )}
        <PaginationContainer>
          {Array.from({ length: totalPages }, (_, i) => (
            <PaginationItem key={i} active={currentPage === i + 1}>
              <PaginationLink onClick={() => paginate(i + 1)}>
                {i + 1}
              </PaginationLink>
            </PaginationItem>
          ))}
        </PaginationContainer>
      </Container>
    </div>
  );
};

export default UserAdmin;
