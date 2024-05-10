import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const NavBar = styled.nav`
    position: fixed;
    height: 100vh;
  ;
    display: flex;
    width: 200px;
    flex-direction: column;
gap: 100px;
    padding: 15px;
    background-color: #fff;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  border:1px solid red;
`;

export const NavLinks = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
    cursor: pointer;
    margin-top: 300px;

    & > * {
        transition: background-color 0.4s ease;
    }

    & > *:hover {
        background-color: #f0f0f0;
    }

   

    &.submenu-open .selected {
        background-color: #f0f0f0;
    }
`;




export const NavItem = styled(Link)`
    color: #333;
    text-decoration: none;
    padding: 12px;
    border-radius: 4px;
    transition: background-color 0.4s ease;
    cursor: pointer;

    &:hover {
        background-color: #f0f0f0;
    }
`;

export const Submenu = styled.div`
    position: absolute;
    top: 100%;
    left: 0;
    background-color: #fff;
    border: 1px solid #ccc;
    padding: 10px;
    width: 100%;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    z-index: 1001;
`;

export const SubmenuItem = styled(Link)`
    display: block;
    color: #333;
    text-decoration: none;
    padding: 8px;
    transition: background-color 0.3s ease;

    & > * {
        transition: background-color 0.4s ease;
    }

    & > *:hover {
        background-color: #f0f0f0;
    }

`;

export const LogoutButton = styled.button`
    background-color: #d9534f;
    color: #fff;
    border: none;
    padding: 10px 20px;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s ease;
    margin-top: auto;

    &:hover {
        background-color: #c9302c;
    }
`;

export const HomeButton = styled.button`
    background-color: #4285f4;
    color: #fff;
    border: none;
    padding: 10px 20px;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s ease;
    margin-top: 20px;

    &:hover {
        background-color: #357ae8;
    }
`;

export const WelcomeText = styled.span`
    font-weight: bold;
    color: #333;
    margin-top: 20px;
`;

export const NavItemWithSubMenu = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
`;

export const SubmenuTrigger = styled.div`
    cursor: pointer;
`;

export const SubmenuContent = styled.div`
   
    position: absolute;
    top: 0;
    left: 100%;
    background-color: #fff;
    border: 1px solid #ccc;
    padding: 10px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    z-index: 1001;
`;
