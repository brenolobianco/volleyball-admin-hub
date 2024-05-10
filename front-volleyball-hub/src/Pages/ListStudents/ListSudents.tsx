import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Navbar from "../../components/SideBard/SideBar";

import { StudentContainer, Button, Container } from "./Styles";
import SideBar from "../../components/SideBard/SideBar";

const apiUrl = process.env.REACT_APP_API_URL;

const ListStudents: React.FC = () => {
  const [students, setStudents] = useState([]);
  const [expanded, setExpanded] = useState<number | null>(null);

  const handleExpand = (id: number) => {
    setExpanded(id === expanded ? null : id);
  };
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const token = localStorage.getItem("@VolleyHub:token"); // Obter token do localStorage
        const response = await axios.get(`${apiUrl}/alunos`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log(response.data)
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

  return (<>   <SideBar />
    <Container><h5>Lista de Estudantes</h5>
 
      <div>
        {students.map((student: any) => (
          <StudentContainer key={student.id}>
            <p>Nome: {student.nome}</p>
            {expanded === student.id && (
              <>
                <p>
                  Data de Nascimento:{" "}
                  {student.data_nascimento
                    ? new Date(student.data_nascimento).toLocaleDateString()
                    : "Não disponível"}
                </p>
                <p>Endereço: {student.endereco || "Não disponível"}</p>
                <p>Nome da Escola: {student.nome_escola || "Não disponível"}</p>
                <p>Plano de Saúde: {student.plano_saude ? "Sim" : "Não"}</p>
                <p>
                  Detalhes do Plano de Saúde:{" "}
                  {student.detalhes_plano_saude || "Não disponível"}
                </p>
                <p>
                  Hospital Preferido:{" "}
                  {student.hospital_preferido || "Não disponível"}
                </p>
                <p>
                  Nome do Responsável:{" "}
                  {student.nome_responsavel || "Não disponível"}
                </p>
                <p>
                  Telefone do Responsável:{" "}
                  {student.telefone_responsavel || "Não disponível"}
                </p>
                <p>
                  Atestado Médico: {student.atestado_medico || "Não disponível"}
                </p>
                <p>
                  Termo de Conduta: {student.termo_conduta || "Não disponível"}
                </p>
                <p>
                  Direitos de Imagem:{" "}
                  {student.direitos_imagem || "Não disponível"}
                </p>
                <p>
                  Data de Cadastro:{" "}
                  {new Date(student.created_at).toLocaleDateString()}
                </p>
                {localStorage.getItem("userType") === "administrador" && (
                  <>
                    <Button onClick={() => handleDelete(student.id)}>
                      Deletar
                    </Button>
                    <Link to={`/edit/${student.id}`}>
                      <Button>Editar</Button>
                    </Link>
                  </>
                )}
              </>
            )}
            <Button onClick={() => handleExpand(student.id)}>
              {expanded === student.id ? "Mostrar menos" : "Mostrar mais"}
            </Button>
          </StudentContainer>
        ))}
      </div>
    </Container></>
  );
};

export default ListStudents;
