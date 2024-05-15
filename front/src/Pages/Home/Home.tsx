import { AppContainer, ColumnContainer, ColumnTitle } from "./Styles";
import Navbar from "../../components/SideBard/SideBar";

const Dashboard: React.FC = () => {
  return (
    <div>
      <Navbar />
      <AppContainer>
        <ColumnContainer>
          <ColumnTitle>Bem Vindo</ColumnTitle>
        </ColumnContainer>
      </AppContainer>
    </div>
  );
};

export default Dashboard;
