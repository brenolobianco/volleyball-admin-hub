import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import {
  NavBar,
  WelcomeText,
  NavLinks,
  SubmenuItem,
  NavItemWithSubMenu,
  LogoutButton,
  Submenu,
} from "./Styles";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import fetchUserType from "../../Pages/utils/apiUtils";
import { toast } from "react-toastify";

const apiUrl = process.env.REACT_APP_API_URL;

const SideBar = () => {
  const navigate = useNavigate();

  const [showAlunosSubMenu, setShowAlunosSubMenu] = useState(false);
  const [showTurmasSubMenu, setShowTurmasSubMenu] = useState(false);
  const [showUsuariosSubMenu, setShowUsuariosSubMenu] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const userType = localStorage.getItem("userType");
  const userName = localStorage.getItem("UserName");

  useEffect(() => {
    fetchUserType().then(({ isAuthenticated }) => {
      setIsAuthenticated(isAuthenticated);
    });
  }, []);
  const handleLogout = () => {
    try {
      localStorage.clear();
      axios.post(`${apiUrl}/logout`);
      navigate("/");
      toast.success("Logout realizado com sucesso!");
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
    }
  };

  return (
    <>
      <NavBar>
        <NavLinks>
          <NavItemWithSubMenu
            title="Pagina Inicial"
            onClick={() => {
              navigate("/dashboard");
            }}
          >
            Pagina Inicial
          </NavItemWithSubMenu>

          <NavItemWithSubMenu
            title="Alunos"
            onClick={() => {
              setShowAlunosSubMenu((prev) => !prev);
              setShowTurmasSubMenu(false);
              setShowUsuariosSubMenu(false);
            }}
          >
            Alunos
            {showAlunosSubMenu && (
              <Submenu>
                {userType === "administrador" && (
                  <SubmenuItem to="/dashboard/cadastraralunos">
                    Cadastrar Alunos
                  </SubmenuItem>
                )}
                <SubmenuItem to="/dashboard/alunos">Listar Alunos</SubmenuItem>
              </Submenu>
            )}
          </NavItemWithSubMenu>

          {showAlunosSubMenu && <div style={{ height: "auto" }} />}

          <NavItemWithSubMenu
            title="Turmas"
            onClick={() => {
              setShowAlunosSubMenu(false);
              setShowTurmasSubMenu((prev) => !prev);
              setShowUsuariosSubMenu(false);
            }}
          >
            Turmas
            {showTurmasSubMenu && (
              <Submenu>
                {userType === "administrador" && (
                  <SubmenuItem to="/dashboard/cadastrarturmas">
                    Cadastrar Turmas
                  </SubmenuItem>
                )}
                <SubmenuItem to="/dashboard/turmas">Listar Turmas</SubmenuItem>
              </Submenu>
            )}
          </NavItemWithSubMenu>

          {showTurmasSubMenu && <div style={{ height: "auto" }} />}

          <NavItemWithSubMenu
            title="Usuários"
            onClick={() => {
              setShowAlunosSubMenu(false);
              setShowTurmasSubMenu(false);
              setShowUsuariosSubMenu((prev) => !prev);
            }}
          >
            Usuários
            {showUsuariosSubMenu && (
              <Submenu>
                {userType === "administrador" && (
                  <SubmenuItem to="/dashboard/cadastraradmin">
                    Cadastrar Usuarios
                  </SubmenuItem>
                )}
                <SubmenuItem to="/dashboard/admin">Listar Usuários</SubmenuItem>
              </Submenu>
            )}
          </NavItemWithSubMenu>

          {showUsuariosSubMenu && <div style={{ height: "auto" }} />}
        </NavLinks>
        <WelcomeText>
          {userName},<br /> {userType}
        </WelcomeText>
        <LogoutButton onClick={handleLogout}>Sair</LogoutButton>
      </NavBar>
    </>
  );
};

export default SideBar;
