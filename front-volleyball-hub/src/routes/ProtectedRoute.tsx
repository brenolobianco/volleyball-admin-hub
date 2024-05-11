import { Navigate, Outlet } from "react-router-dom";
import { toast } from "react-toastify";

export const ProtectRoute = () => {
  const token = localStorage.getItem("@VolleyHub:token");
  const userType = localStorage.getItem("userType");

  if (!token) {
    // Se não houver token, redireciona para a página inicial
    toast.error("Acesso negado, por favor realize o login");
    return <Navigate to="/" />;
  }


  // Caso contrário, permite o acesso ao conteúdo protegido
  return <Outlet />;
};
export const ProtectRoutePermission = () => {

  const userType = localStorage.getItem("userType");

 
if (userType==="usuario") {
  toast.error("voce não tem permissão para acessar esta pagina");
  return <Navigate to="/dashboard" />;
}

  // Caso contrário, permite o acesso ao conteúdo protegido
  return <Outlet />;
};
