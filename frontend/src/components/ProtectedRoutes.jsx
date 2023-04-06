import { useNavigate, Navigate, Outlet } from "react-router-dom";
import Cookies from "js-cookie";

const CheckCookie = ({ children }) => {
  const navigate = useNavigate();

  const DELAY = 480000; //480 seconds --> 8 minutes

  // time interval
  const timeIntervalId = setInterval(() => {
    // check cookie
    if (Cookies.get("token") === undefined) {
      // stop interval
      clearTimeout(timeIntervalId);
      localStorage.removeItem("token");
      // navigate to login page
      navigate("/login");
    }
  }, DELAY);

  return (
    <>
      {localStorage.getItem("token") ? (
        children
      ) : (
        <Navigate to="/login" replace={true} />
      )}
    </>
  );
};

const ProtectedRoutes = ({ access }) => {
  return (
    <>
      <CheckCookie>
        {access ? <Outlet /> : <Navigate to="/login" replace={access} />}
      </CheckCookie>
    </>
  );
};

export default ProtectedRoutes;
