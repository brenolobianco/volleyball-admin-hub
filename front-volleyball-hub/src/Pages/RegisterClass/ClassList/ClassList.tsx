import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Button, ContentContainer, ListContainer, ListHeader, ListItem, PageContainer } from "./Styles";
import { EmptyMessage } from "../../Dashboard/Styles";
import fetchUserType from "../../utils/apiUtils";
import { NavBar } from "../../../components/SideBard/Styles";
import SideBar from "../../../components/SideBard/SideBar";

const apiUrl = process.env.REACT_APP_API_URL;
const itemsPerPage = 5;

const ListClass: React.FC = () => {
  const [turmas, setTurmas] = useState([]);
  const [userType, setUserType] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
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

  useEffect(() => {
    fetchUserType().then(({ userType }) => {
      setUserType(userType);
    });
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
      setTurmas(turmas.filter((turma: any) => turma.id !== id));
      toast.success("Turma deletada com sucesso.");
    } catch (error) {
      toast.error("Erro ao deletar turma.");
    }
  };

  const totalPages = Math.ceil(turmas.length / itemsPerPage);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = turmas.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (<><SideBar/>
    <PageContainer>
      <ContentContainer>
        {currentItems.length > 0 ? (
          currentItems.map((turma: any) => (
            <ListContainer key={turma.id}>
              <ListHeader>
                <h2>{turma.titulo}</h2>
              </ListHeader>
              <ListItem>
                <p><strong>Horário:</strong> {turma.horario}</p>
                <p><strong>Professor:</strong> {turma.professor}</p>
                <p><strong>Cadastrado em:</strong> {turma.created_at}</p>
                {userType === "administrador" && (
                  <Button onClick={() => handleDelete(turma.id)}>Deletar</Button>
                )}
              </ListItem>
            </ListContainer>
          ))
        ) : (
          <EmptyMessage>Nenhuma turma cadastrada.</EmptyMessage>
        )}
        <nav>
          <ul className="pagination">
            {Array.from({ length: totalPages }, (_, i) => (
              <li key={i} className={`page-item ${currentPage === i + 1 ? 'active' : ''}`}>
                <button onClick={() => paginate(i + 1)} className="page-link">
                  {i + 1}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </ContentContainer>
    </PageContainer></>
  );
};

export default ListClass;
