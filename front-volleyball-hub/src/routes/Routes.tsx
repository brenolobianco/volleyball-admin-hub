import { Route, Routes, Navigate } from "react-router-dom";
import { ProtectRoute, ProtectRoutePermission } from "./ProtectedRoute";
import Dashboard from "../Pages/Dashboard/Dashboard";

import Login from "../Pages/Login/Login";
import RegisterPage from "../Pages/Register/Register";
import ListStudents from "../Pages/ListStudents/ListSudents";
import RegisterClass from "../Pages/RegisterClass/RegisterClass";
import UserAdmin from "../Pages/UsersManager/UserAmin";
import UserRegister from "../Pages/UsersManager/UserRegister/UserRegister";
import ListClass from "../Pages/RegisterClass/ClassList/ClassList";

export const RoutesMain = () => {
  return (
    <Routes>
      {/* Rotas comuns para ambos os tipos de usuário */}

      <Route path="/login" element={<Login />} />

      {/* Rota de proteção para páginas restritas */}
      <Route element={<ProtectRoute />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dashboard/alunos" element={<ListStudents />} />

        <Route element={<ProtectRoutePermission />}>
          <Route path="/dashboard/cadastraralunos" element={<RegisterPage />} />
          <Route
            path="/dashboard/cadastrarturmas"
            element={<RegisterClass />}
          /> <Route path="/dashboard/turmas" element={<ListClass />} />
 <Route path="/dashboard/cadastraradmin" element={<UserRegister />} />
          <Route path="/dashboard/admin" element={<UserAdmin />} />
        </Route>

      </Route>
    </Routes>
  );
};
