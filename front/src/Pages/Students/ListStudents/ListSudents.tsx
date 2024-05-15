import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import {
  PageContainer,
  Container,
  StudentContainer,
  StudentHeader,
  StudentDetails,
  Button,
  Pagination
} from "./Styles";
import SideBar from "../../../components/SideBard/SideBar";

const apiUrl = process.env.REACT_APP_API_URL;
const itemsPerPage = 10;

const ListStudents: React.FC = () => {
  const [students, setStudents] = useState([]);
  const [expanded, setExpanded] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const token = localStorage.getItem("@VolleyHub:token");
        const response = await axios.get(`${apiUrl}/alunos`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setStudents(response.data);
      } catch (error) {
        toast.error("Erro ao carregar lista de estudantes.");
      }
    };

    fetchStudents();
  }, []);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const filteredStudents = students.filter((student: any) =>
    student.nome.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredStudents.length / itemsPerPage);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredStudents.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  async function downloadFile(studentId: number, fileType: string) {
    try {
      const token = localStorage.getItem("@VolleyHub:token");
      const response = await axios.get(`${apiUrl}/alunos/${studentId}/download/${fileType}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/octet-stream',
          ContentType: 'application/json'
        },
        responseType: 'blob'
      });

      const blob = new Blob([response.data], { type: response.headers['content-type'] });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${fileType}`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error(error);
      toast.error("Erro ao baixar o arquivo.");
    }
  }

  const handleDelete = async (id: number) => {
    try {
      const token = localStorage.getItem("@VolleyHub:token");
      const userType = localStorage.getItem("userType");

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

  return (
    <>
      <SideBar />
      <PageContainer>
        <Container>
          <div style={{ marginBottom: '20px' }}>
            <input
              type="text"
              placeholder="Pesquisar alunos..."
              value={searchTerm}
              onChange={handleSearchChange}
              style={{
                width: '100%',
                padding: '10px',
                borderRadius: '4px',
                border: '1px solid #ddd',
              }}
            />
          </div>
          {currentItems.map((student: any) => (
            <StudentContainer key={student.id}>
              <StudentHeader>
                <h2>{student.nome}</h2>
                <Button onClick={() => handleExpand(student.id)}>
                  {expanded === student.id ? "Detalhes" : "Mostrar mais"}
                </Button>
              </StudentHeader>
              {expanded === student.id && (
                <StudentDetails>
                  <p>
                    <strong>Data de Nascimento:</strong>{" "}
                    {student.data_nascimento
                      ? new Date(student.data_nascimento).toLocaleDateString()
                      : "Não disponível"}
                  </p>
                  <p>
                    <strong>Endereço:</strong> {student.endereco}
                  </p>
                  <p>
                    <strong>Nome da Escola:</strong>{" "}
                    {student.nome_escola || "Não disponível"}
                  </p>
                  <p>
                    <strong>Turma:</strong>{" "}
                    {student.turma.titulo + " - " + student.turma.horario || "Não disponível"}
                  </p>
                  <p>
                    <strong>Plano de Saúde:</strong>{" "}
                    {student.plano_saude ? "Sim" : "Não"}
                  </p>
                  <p>
                    <strong>Detalhes do Plano de Saúde:</strong>{" "}
                    {student.plano_saude || "Não disponível"}
                  </p>
                  <p>
                    <strong>Hospital Preferido:</strong>{" "}
                    {student.hospital_preferido || "Não disponível"}
                  </p>
                  <p>
                    <strong>Nome do Responsável:</strong>{" "}
                    {student.nome_responsavel || "Não disponível"}
                  </p>
                  <p>
                    <strong>Telefone do Responsável:</strong>{" "}
                    {student.telefone_responsavel || "Não disponível"}
                  </p>
                  <p>
                    <strong>Atestado Médico:</strong>
                    {student.atestado_medico ? (
                      <button onClick={() => downloadFile(student.id, 'atestado_medico')}>
                        Baixar Atestado Médico
                      </button>
                    ) : (
                      "Não disponível"
                    )}
                  </p>
                  <p>
                    <strong>Termo de Conduta:</strong>
                    {student.termo_conduta ? (
                      <button onClick={() => downloadFile(student.id, 'termo_conduta')}>
                        Termo Conduta
                      </button>
                    ) : (
                      "Não disponível"
                    )}
                  </p>
                  <p>
                    <strong>Imagem:</strong>
                    {student.imagem_perfil ? (
                      <button onClick={() => downloadFile(student.id, 'imagem_perfil')}>
                        Baixar foto
                      </button>
                    ) : (
                      "Não disponível"
                    )}
                  </p>
                  <p>
                    <strong>Direitos de Imagem:</strong>
                    {student.direitos_imagem ? (
                      <button onClick={() => downloadFile(student.id, 'direitos_imagem')}>
                        Baixar Direitos de imagem
                      </button>
                    ) : (
                      "Não disponível"
                    )}
                  </p>
                  <p>
                    <strong>Data de Cadastro:</strong>{" "}
                    {new Date(student.created_at).toLocaleDateString()}
                  </p>
                  {localStorage.getItem("userType") === "administrador" && (
                    <>
                      <Button onClick={() => handleDelete(student.id)}>
                        Deletar
                      </Button>
                    </>
                  )}
                </StudentDetails>
              )}
            </StudentContainer>
          ))}
          <Pagination>
            <ul style={{ display: "flex", justifyContent: "center", flexDirection: "row", gap: "10px" }} className="pagination">
              {Array.from({ length: totalPages }, (_, i) => (
                <li
                  key={i}
                  className={`page-item ${currentPage === i + 1 ? "active" : ""}`}
                >
                  <button onClick={() => paginate(i + 1)} className="page-link">
                    {i + 1}
                  </button>
                </li>
              ))}
            </ul>
          </Pagination>
        </Container>
      </PageContainer>
    </>
  );
};

export default ListStudents;
