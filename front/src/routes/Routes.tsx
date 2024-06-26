import { Route, Routes, Navigate } from "react-router-dom";
import { ProtectRoute, ProtectRoutePermission } from "./ProtectedRoute";
import Dashboard from "../Pages/Home/Home";

import Login from "../Pages/Login/Login";
import RegisterPage from "../Pages/Students/RegisterStudents/RegisterStudents";
import ListStudents from "../Pages/Students/ListStudents/ListSudents";
import RegisterClass from "../Pages/Classes/RegisterClass/RegisterClass";
import UserAdmin from "../Pages/Users/ListUsers/ListUsers";
import UserRegister from "../Pages/Users/UserRegister/UserRegister";
import ListClass from "../Pages/Classes/ListClasses/ListClasses";

export const RoutesMain = () => {
  return (
    <Routes>
      {/* Rotas comuns para ambos os tipos de usuário */}

      <Route path="/" element={<Login />} />

      {/* Rota de proteção para páginas restritas */}
      <Route element={<ProtectRoute />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dashboard/alunos" element={<ListStudents />} />
        <Route path="/dashboard/turmas" element={<ListClass />} />
        <Route element={<ProtectRoutePermission />}>
          <Route path="/dashboard/cadastraralunos" element={<RegisterPage />} />
          <Route
            path="/dashboard/cadastrarturmas"
            element={<RegisterClass />}
          />{" "}
         
          <Route path="/dashboard/cadastraradmin" element={<UserRegister />} />
          <Route path="/dashboard/admin" element={<UserAdmin />} />
        </Route>
      </Route>
    </Routes>
  );
};
