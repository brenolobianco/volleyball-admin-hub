import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import {
  NavBar,
  NavItem,
  LogoutButton,
  WelcomeText,
  NavLinks,
  HomeButton,
  SubmenuItem,
  NavItemWithSubMenu,
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

  console.log(userType);
  const handleLogout = () => {
    try {
      // Limpar localStorage
      localStorage.clear();

      // Chamar o endpoint de logout
      axios.post(`${apiUrl}/logout`);

      navigate("/login"); // Supondo que você tenha uma função navigate para redirecionar para a página de login
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
    }
  };
  const loggedInUserName = localStorage.getItem("UserName");

  return (
    <>
    <NavBar>
      <NavLinks >
        <NavItemWithSubMenu
          title="Pagina Inicial"
          onClick={() => {
            setShowAlunosSubMenu(false);
            setShowTurmasSubMenu(false);
            setShowUsuariosSubMenu(false);
          }}
        >
          Pagina Inicial
         
        </NavItemWithSubMenu>


        <NavItemWithSubMenu
          title="Turmas"
          onClick={() => {
            setShowAlunosSubMenu(true);
            setShowTurmasSubMenu(false);
            setShowUsuariosSubMenu(false);
          }}
        >
          Alunos
          {showAlunosSubMenu && (
            <>
              {userType === "administrador" && (
                <SubmenuItem to="/dashboard/alunos">
                  Listar Alunos
                </SubmenuItem>
              )}
              <SubmenuItem to="/dashboard/cadastraralunos">Cadastrar Alunos</SubmenuItem>
            </>
          )}
        </NavItemWithSubMenu>
        <NavItemWithSubMenu
          title="Turmas"
          onClick={() => {
            setShowAlunosSubMenu(false);
            setShowTurmasSubMenu(true);
            setShowUsuariosSubMenu(false);
          }}
        >
          Turmas
          {showTurmasSubMenu && (
            <>
              {userType === "administrador" && (
                <SubmenuItem to="/dashboard/cadastrarturmas">
                  Cadastrar Turmas
                </SubmenuItem>
              )}
              <SubmenuItem to="/dashboard/turmas">Listar Turmas</SubmenuItem>
            </>
          )}
        </NavItemWithSubMenu>

        <NavItemWithSubMenu
          title="Usuários"
          onClick={() => {
            setShowAlunosSubMenu(false);
            setShowTurmasSubMenu(false);
            setShowUsuariosSubMenu(true);
          }}
        >
          Usuários
          {showUsuariosSubMenu && (
            <>
              {userType === "administrador" && (
                <SubmenuItem to="/dashboard/cadastraradmin">
                  Cadastrar Usuarios
                </SubmenuItem>
              )}
              <SubmenuItem to="/dashboard/admin">Listar Usuários</SubmenuItem>
            </>
          )}
        </NavItemWithSubMenu>
      </NavLinks>
      <WelcomeText>
        Bem-vindo, {loggedInUserName} ({userType})
      </WelcomeText>
      <LogoutButton onClick={handleLogout}>Sair</LogoutButton>
      <NavLink to="/">
        <HomeButton>Home</HomeButton>
      </NavLink>
    </NavBar>
  </>
  );
};

export default SideBar;
