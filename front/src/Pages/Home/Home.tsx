import { AppContainer, ColumnContainer, ColumnTitle } from "./Styles";

import SideBar from "../../components/SideBard/SideBar";
import { useEffect, useState } from "react";
import fetchUserType from "../utils/apiUtils";

const Dashboard: React.FC = () => {
  const [userType, setUserType] = useState(""); const [userName, setUsername] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  useEffect(() => {
    fetchUserType().then(({ userName,userType, isAuthenticated }) => {
      setUserType(userType);
      setUsername(userName);
      setIsAuthenticated(isAuthenticated);
    });
    }
  , []);

  return (
    <div>
      <SideBar />
      <AppContainer>
        <ColumnContainer>
          <h1>Bem Vindo</h1>
          <ColumnTitle>{userName}</ColumnTitle>
        
     
        </ColumnContainer>
      </AppContainer>
    </div>
  );
};

export default Dashboard;
