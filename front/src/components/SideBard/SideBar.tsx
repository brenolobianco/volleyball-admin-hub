import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import {
  NavBar,
  WelcomeText,
  NavLinks,
  SubmenuItem,
  NavItemWithSubMenu,LogoutButton,
  Submenu
} from "./Styles";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import fetchUserType from "../../Pages/utils/apiUtils";

const apiUrl = process.env.REACT_APP_API_URL;

const SideBar = () => {
  const navigate = useNavigate();
  const [userType, setUserType] = useState("");
  const [showAlunosSubMenu, setShowAlunosSubMenu] = useState(false);
  const [showTurmasSubMenu, setShowTurmasSubMenu] = useState(false);
  const [showUsuariosSubMenu, setShowUsuariosSubMenu] = useState(false);

  useEffect(() => {
    const cachedUserType = localStorage.getItem("userType");
    if (cachedUserType) {
      setUserType(cachedUserType);
    } else {
      fetchUserType().then(({ userType }) => {
        setUserType(userType);
        localStorage.setItem("userType", userType); // Armazenar o userType em cache
      });
    }
  }, []);

  const handleLogout = () => {
    try {
      localStorage.clear();
      axios.post(`${apiUrl}/logout`);
      navigate("/");
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
    }
  };
  const loggedInUserName = localStorage.getItem("UserName");
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

          {showAlunosSubMenu && <div style={{ height: 'auto' }} />}

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

          {showTurmasSubMenu && <div style={{ height: 'auto' }} />}

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

          {showUsuariosSubMenu && <div style={{ height: 'auto' }} />}
        </NavLinks>
        <WelcomeText>
          Bem-vindo, {loggedInUserName} ({userType})
        </WelcomeText>
        <LogoutButton onClick={handleLogout}>Sair</LogoutButton>
      </NavBar>
    </>
  );
};

export default SideBar;
