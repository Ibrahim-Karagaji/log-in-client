import { Navigate, useNavigate } from "react-router-dom";
import { UserContext } from "../stateManagement/UserState";
import { useEffect, useContext, useState, useRef } from "react";
import getUserDataService from "../services/getUserDataService";
import Loading from "./Loading";

export default function ProtectedRoute({ children }) {
  const token = window.localStorage.getItem("token");
  const userState = useContext(UserContext);
  const navigate = useNavigate();
  const dialogRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);

  if (!token) {
    return <Navigate to="/sign-up" />;
  }

  useEffect(() => {
    dialogRef.current.showModal();

    const checkAuth = async () => {
      const data = await getUserDataService(token);

      if (data.error) {
        return navigate("/sign-in");
      } else {
        setIsLoading(false);
        userState.setUserState((prev) => {
          return { ...prev, name: data.user.name, email: data.user.email };
        });
      }
    };
    checkAuth();
  }, []);

  return isLoading ? <Loading dialogRef={dialogRef} /> : children;
}
