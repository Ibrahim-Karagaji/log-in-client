import "./App.css";
import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";
import ResetPassword from "./components/ResetPassword";
import ProtectedRoute from "./components/ProtectedRoute";
import UserProfile from "./components/UserProfile";
import CheckCode from "./components/CheckCode";
import ChangePasswordForm from "./components/ChangePasswordForm";
import CodeState from "./stateManagement/CodeState";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserState from "./stateManagement/UserState";

export default function App() {
  return (
    <UserState>
      <CodeState>
        <div className="app bg-[#eee] !h-screen !w-screen">
          <p className="text-center !p-1 leading-[1.6]">
            <span className="font-bold text-[#2D11B7]">important notice: </span>
            if you met any stranger error please try to use the website after 5
            or 10 minutes
          </p>
          <BrowserRouter>
            <Routes>
              <Route
                path="/"
                element={
                  <ProtectedRoute>
                    <UserProfile />
                  </ProtectedRoute>
                }
              />
              <Route path="/change-password" element={<ChangePasswordForm />} />
              <Route path="/sign-up" element={<SignUp />} />
              <Route path="/sign-in" element={<SignIn />} />
              <Route path="/reset-password" element={<ResetPassword />} />
              <Route path="/check-code" element={<CheckCode />} />
              <Route
                path="*"
                element={
                  <h1 className="text-center !mt-[100px]">Page Not Found 🙁</h1>
                }
              />
            </Routes>
          </BrowserRouter>
        </div>
      </CodeState>
    </UserState>
  );
}
