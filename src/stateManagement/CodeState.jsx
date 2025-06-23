import { createContext, useState } from "react";
export const CodeContext = createContext();

export default function CodeState({ children }) {
  const [code, setCode] = useState("");
  const value = { code: code, setCode };
  return <CodeContext.Provider value={value}>{children}</CodeContext.Provider>;
}
