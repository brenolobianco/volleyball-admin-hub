import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { AppContainer, ColumnContainer, ColumnTitle } from "./Styles";
import { toast } from "react-toastify";

import Navbar from "../../components/SideBard/SideBar";

const apiUrl = process.env.REACT_APP_API_URL;

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
