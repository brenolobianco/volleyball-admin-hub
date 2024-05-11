import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { PageContainer,  Container, StudentContainer, StudentHeader, StudentDetails, Button, EmptyMessage } from "./Styles";
import SideBar from "../../components/SideBard/SideBar";
import { NavBar } from "../../components/SideBard/Styles";

const apiUrl = process.env.REACT_APP_API_URL;
const itemsPerPage = 5;

const ListStudents: React.FC = () => {
  const [students, setStudents] = useState([]);
  const [expanded, setExpanded] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const token = localStorage.getItem("@VolleyHub:token");
        const response = await axios.get(`${apiUrl}/alunos`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });console.log(response.data)
        setStudents(response.data);
      } catch (error) {
        toast.error("Erro ao carregar lista de estudantes.");
      }
    };

    fetchStudents();
  }, []);

  const handleDelete = async (id: number) => {
    try {
      const token = localStorage.getItem("@VolleyHub:token");
      const userType = localStorage.getItem("userType");

      // Verificar se o tipo de usuário é administrador
      if (userType !== "administrador") {
        toast.error("Você não tem permissão para realizar esta operação.");
        return;
      }

      await axios.delete(`${apiUrl}/alunos/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setStudents(students.filter((student: any) => student.id !== id));
      toast.success("Estudante deletado com sucesso.");
    } catch (error) {
      toast.error("Erro ao deletar estudante.");
    }
  };

  const handleExpand = (id: number) => {
    setExpanded(id === expanded ? null : id);
  };

  const totalPages = Math.ceil(students.length / itemsPerPage);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = students.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (<>  
    <SideBar />
    <PageContainer>
     
      <Container>
        {currentItems.length > 0 ? (
          currentItems.map((student: any) => (
            <StudentContainer key={student.id}>
              <StudentHeader>
                <h2>{student.nome}</h2>
              </StudentHeader>
              {expanded === student.id && (
                <StudentDetails>
                  <p><strong>Data de Nascimento:</strong> {student.data_nascimento ? new Date(student.data_nascimento).toLocaleDateString() : "Não disponível"}</p>
                  <p><strong>Endereço:</strong> {student.endereco }</p>
                  <p><strong>Nome da Escola:</strong> {student.nome_escola || "Não disponível"}</p>
                  <p><strong>Plano de Saúde:</strong> {student.plano_saude ? "Sim" : "Não"}</p>
                  <p><strong>Detalhes do Plano de Saúde:</strong> {student.detalhes_plano_saude || "Não disponível"}</p>
                  <p><strong>Hospital Preferido:</strong> {student.hospital_preferido || "Não disponível"}</p>
                  <p><strong>Nome do Responsável:</strong> {student.nome_responsavel || "Não disponível"}</p>
                  <p><strong>Telefone do Responsável:</strong> {student.telefone_responsavel || "Não disponível"}</p>
                  <p><strong>Atestado Médico:</strong> {student.atestado_medico || "Não disponível"}</p>
                  <p><strong>Termo de Conduta:</strong> {student.termo_conduta || "Não disponível"}</p>
                  <p><strong>Direitos de Imagem:</strong> {student.direitos_imagem || "Não disponível"}</p>
                  <p><strong>Data de Cadastro:</strong> {new Date(student.created_at).toLocaleDateString()}</p>
                  {localStorage.getItem("userType") === "administrador" && (
                    <>
                      <Button onClick={() => handleDelete(student.id)}>Deletar</Button>
                      <Link to={`/edit/${student.id}`}>
                        <Button>Editar</Button>
                      </Link>
                    </>
                  )}
                </StudentDetails>
              )}
              <Button onClick={() => handleExpand(student.id)}>
                {expanded === student.id ? "Mostrar menos" : "Mostrar mais"}
              </Button>
            </StudentContainer>
          ))
        ) : (
          <EmptyMessage>Nenhum estudante encontrado.</EmptyMessage>
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
      </Container>
    </PageContainer></>
  );
};

export default ListStudents;
