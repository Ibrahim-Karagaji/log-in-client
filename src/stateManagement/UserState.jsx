import { useState, createContext } from "react";

export const UserContext = createContext();

export default function UserState({ children }) {
  const [userState, setUserState] = useState({
    name: "",
    email: "",
  });
  const state = { userState: userState, setUserState };
  return <UserContext.Provider value={state}>{children}</UserContext.Provider>;
}
