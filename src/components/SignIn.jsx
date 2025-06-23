import { Link } from "react-router-dom";
import { useState, useRef, useContext } from "react";
import Loading from "./Loading";
import signinService from "../services/signinService";
import { UserContext } from "../stateManagement/UserState";
import { useNavigate } from "react-router-dom";

export default function SignIn() {
  const [user, setUser] = useState({ email: "", password: "" });
  const userState = useContext(UserContext);
  const dialogRef = useRef(null);
  const responseMessage = useRef(null);
  const navigate = useNavigate();

  const handleRequest = async () => {
    dialogRef.current.showModal();
    const data = await signinService(user);

    if (data.error) {
      dialogRef.current.close();
      responseMessage.current.innerHTML = data.err.message;
      responseMessage.current.style.backgroundColor = "red";
      responseMessage.current.style.left = "20px";
      setTimeout(() => {
        responseMessage.current.style.left = "-900px";
      }, 3000);
      return;
    }
    if (data.ok) {
      dialogRef.current.close();

      userState.setUserState((prev) => {
        return { ...prev, name: data.user, email: data.user };
      });

      window.localStorage.setItem("token", `Bearer ${data.token}`);

      navigate("/");
    }
  };

  return (
    <div className="sign flex h-full w-full shadow-[0px_4px_12px_#2D11B7] rounded-[10px] !max-w-[900px] max-h-[900px] leading-[1.8]">
      <div className="grid content-center rounded-tl-[10px] rounded-bl-[10px] p-1 h-full">
        <h1 className="font-black text-center">Hello!</h1>
        <p className="font-semibold text-center">Sign in your account</p>
        <form
          onSubmit={(e) => e.preventDefault()}
          className="grid gap-5 !mt-[10px] !mb-[10px]"
        >
          <label className="flex gap-2 items-center shadow-[0px_4px_12px_#2D11B7] p-2 rounded-2xl !w-[95%]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="#2D11B7"
              className="bg-[#eee] h-8 !w-auto"
            >
              <path d="m480-920 362 216q18 11 28 30t10 40v434q0 33-23.5 56.5T800-120H160q-33 0-56.5-23.5T80-200v-434q0-21 10-40t28-30l362-216Zm0 466 312-186-312-186-312 186 312 186Zm0 94L160-552v352h640v-352L480-360Zm0 160h320-640 320Z" />
            </svg>
            <input
              onInput={(e) => {
                setUser((prev) => {
                  return { ...prev, email: e.target.value };
                });
              }}
              name="email"
              className="focus:outline-none focus:border-transparent !h-full"
              placeholder="Your email"
              required
              type="email"
            />
          </label>
          <label className="flex gap-2 items-center shadow-[0px_4px_12px_#2D11B7] p-2 rounded-2xl !w-[95%]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              fill="#2D11B7"
              className="bg-[#eee] h-8 !w-auto"
            >
              <path d="M240-80q-33 0-56.5-23.5T160-160v-400q0-33 23.5-56.5T240-640h40v-80q0-83 58.5-141.5T480-920q83 0 141.5 58.5T680-720v80h40q33 0 56.5 23.5T800-560v400q0 33-23.5 56.5T720-80H240Zm0-80h480v-400H240v400Zm240-120q33 0 56.5-23.5T560-360q0-33-23.5-56.5T480-440q-33 0-56.5 23.5T400-360q0 33 23.5 56.5T480-280ZM360-640h240v-80q0-50-35-85t-85-35q-50 0-85 35t-35 85v80ZM240-160v-400 400Z" />
            </svg>
            <input
              onInput={(e) => {
                setUser((prev) => {
                  return { ...prev, password: e.target.value };
                });
              }}
              name="password"
              className="focus:outline-none focus:border-transparent !h-full"
              placeholder="Your password"
              type="password"
              required
              minLength={8}
            />
          </label>
          <div className="flex justify-between items-center text-[#2D11B7] font-medium pr-[10px] pl-[10px]">
            <label className="grid justify-center items-center">
              <p>Remember me</p>
              <input type="checkbox" className="!h-[15px]" />
            </label>
            <Link to="/reset-password">
              <p className="grid-rows-1 text-end duration-150 hover:text-[#4b3f8f]">
                Forgot password?
              </p>
            </Link>
          </div>
          <button
            onClick={handleRequest}
            className="bg-[#2D11B7] !w-[45%] p-2 rounded-3xl text-[#eee] font-bold"
          >
            SIGN IN
          </button>
          <Link to="/sign-up">
            <p className="text-[#2D11B7] text-center font-semibold">
              Don’t have an account? Sign up
            </p>
          </Link>
        </form>
        <p
          className="fixed bottom-[50px] left-[-150px] duration-300 p-[5px] rounded-[5px] text-[#eee] font-normal !w-fit"
          ref={responseMessage}
        ></p>
        <Loading dialogRef={dialogRef} />
      </div>
      <div className="welcome grid justify-center content-center text-center bg-[#2D11B7] rounded-tr-[10px] rounded-br-[10px] p-2 text-[#eee] gap-2 h-full">
        <h1 className="font-medium">Welcome Back!</h1>
        <p className="font-medium">
          We're glad to see you again. Log in to access your account and
          continue where you left off.
        </p>
      </div>
    </div>
  );
}
