import { Link } from "react-router-dom";
import { useState, useRef, useContext } from "react";
import Loading from "./Loading";
import { UserContext } from "../stateManagement/UserState";
import signupService from "../services/signupService";
import { useNavigate } from "react-router-dom";

export default function SignUp() {
  const [user, setUser] = useState({ name: "", email: "", password: "" });
  const userState = useContext(UserContext);
  const dialogRef = useRef(null);
  const responseMessage = useRef(null);
  const navigate = useNavigate();

  const handleRequest = async () => {
    dialogRef.current.showModal();
    const data = await signupService(user);

    if (data.error) {
      dialogRef.current.close();
      responseMessage.current.innerHTML = data.err.message;
      responseMessage.current.style.backgroundColor = "red";
      responseMessage.current.style.left = "20px";
      setTimeout(() => {
        responseMessage.current.style.left = "-900px";
      }, 3000);
    }
    if (data.ok) {
      dialogRef.current.close();

      userState.setUserState((prev) => {
        return { ...prev, name: data.user.name, email: data.user.email };
      });

      window.localStorage.setItem("token", `Bearer ${data.token}`);

      navigate("/");
    }
  };

  return (
    <div className="sign flex h-full w-full shadow-[0px_4px_12px_#2D11B7] rounded-[10px] !max-w-[900px] max-h-[900px] leading-[1.8]">
      <div className="grid content-center rounded-tl-[10px] rounded-bl-[10px] p-1 h-full">
        <h1 className="font-black text-center">Hello, Friend!</h1>
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
              className="bg-[#eee] h-8 !w-auto "
            >
              <path d="M234-276q51-39 114-61.5T480-360q69 0 132 22.5T726-276q35-41 54.5-93T800-480q0-133-93.5-226.5T480-800q-133 0-226.5 93.5T160-480q0 59 19.5 111t54.5 93Zm246-164q-59 0-99.5-40.5T340-580q0-59 40.5-99.5T480-720q59 0 99.5 40.5T620-580q0 59-40.5 99.5T480-440Zm0 360q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q53 0 100-15.5t86-44.5q-39-29-86-44.5T480-280q-53 0-100 15.5T294-220q39 29 86 44.5T480-160Zm0-360q26 0 43-17t17-43q0-26-17-43t-43-17q-26 0-43 17t-17 43q0 26 17 43t43 17Zm0-60Zm0 360Z" />
            </svg>
            <input
              onInput={(e) => {
                setUser((prev) => {
                  return { ...prev, name: e.target.value };
                });
              }}
              name="name"
              className="focus:outline-none focus:border-transparent !h-full"
              placeholder="Your name"
              type="text"
              required
              minLength={3}
            />
          </label>
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
          <label className="grid justify-center items-center text-[#2D11B7] font-medium pr-[10px] pl-[10px]">
            <p>Remember me</p>
            <input type="checkbox" className="!h-[15px]" />
          </label>
          <button
            onClick={handleRequest}
            className="bg-[#2D11B7] !w-[45%] p-2 rounded-3xl text-[#eee] font-bold"
          >
            CREATE ACCOUNT
          </button>
          <Link to="/sign-in">
            <p className="text-[#2D11B7] text-center font-semibold">
              I have account Already
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
        <h1 className="font-medium">Glad to see you!</h1>
        <p className="font-medium">
          Welcome aboard! We're so glad to have you join our community.
        </p>
      </div>
    </div>
  );
}
