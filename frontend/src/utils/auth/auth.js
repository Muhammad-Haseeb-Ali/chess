import { useLocation, useNavigate } from "react-router-dom";
import { getCookie } from "../readCookies";

// Define a custom hook for handling authentication and navigation
export function useAuthAndNavigation() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const accessToken = getCookie("access_token"); // Assuming getCookie is a function you've defined elsewhere.

  const checkAuthentication = () => {
    if (!accessToken) {
      navigate("/login", { state: { from: pathname } });
    }
  };

  return {
    checkAuthentication,
  };
}
