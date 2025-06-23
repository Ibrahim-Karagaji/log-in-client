import { useNavigate } from "react-router-dom";
import { useRef, useState } from "react";
import Loading from "./Loading";
import updateService from "../services/updateService";

export default function ChangePasswordForm() {
  const dialogRef = useRef(null);
  const responseMessage = useRef(null);
  const [passwords, setPasswords] = useState({ password1: "", password2: "" });
  const navigate = useNavigate();

  const handleChangePassword = async () => {
    dialogRef.current.showModal();

    if (passwords.password1 != passwords.password2) {
      dialogRef.current.close();
      responseMessage.current.innerHTML =
        "you have to make your passwords the same";
      responseMessage.current.style.backgroundColor = "red";
      responseMessage.current.style.left = "20px";
      setTimeout(() => {
        responseMessage.current.style.left = "-900px";
      }, 3000);
      return;
    }

    const result = await updateService({ password: passwords.password1 });

    if (result.error) {
      dialogRef.current.close();
      responseMessage.current.innerHTML = result.message;
      responseMessage.current.style.backgroundColor = "red";
      responseMessage.current.style.left = "20px";
      setTimeout(() => {
        responseMessage.current.style.left = "-900px";
      }, 3000);
    }

    if (result.ok) {
      dialogRef.current.close();
      responseMessage.current.innerHTML = result.message;
      responseMessage.current.style.backgroundColor = "green";
      responseMessage.current.style.left = "20px";
      setTimeout(() => {
        responseMessage.current.style.left = "-900px";
      }, 3000);
      window.localStorage.removeItem("resetPasswordToken");
      setTimeout(() => {
        navigate("/sign-in");
      }, 4000);
    } else {
      window.alert("The code has expired.");
      navigate("/sign-in");
    }
  };

  return (
    <div className="sign flex h-full w-full shadow-[0px_4px_12px_#2D11B7] rounded-[10px] !max-w-[900px] max-h-[900px] leading-[1.8]">
      <div className="grid content-center rounded-tl-[10px] rounded-bl-[10px] p-1 h-full">
        <h1 className="font-black text-center">Hello</h1>
        <p className="font-semibold text-center !text-[14px]">
          please enter your password and repit it
        </p>
        <form
          onClick={(e) => e.preventDefault()}
          className="grid gap-5 !mt-[10px] !mb-[10px]"
        >
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
                setPasswords((prev) => {
                  return { ...prev, password1: e.target.value };
                });
              }}
              name="password1"
              className="focus:outline-none focus:border-transparent !h-full"
              placeholder="Your password"
              type="password"
              required
              minLength={6}
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
                setPasswords((prev) => {
                  return { ...prev, password2: e.target.value };
                });
              }}
              name="password2"
              className="focus:outline-none focus:border-transparent !h-full"
              placeholder="repit Your password"
              type="password"
              required
              minLength={6}
            />
          </label>
          <button
            onClick={() => {
              handleChangePassword();
            }}
            className="bg-[#2D11B7] !w-[45%] p-2 rounded-3xl text-[#eee] font-bold"
          >
            CONFIRM
          </button>
        </form>
      </div>
      <p
        className="fixed bottom-[50px] left-[-150px] duration-300 p-[5px] rounded-[5px] text-[#eee] font-normal !w-fit"
        ref={responseMessage}
      ></p>
      <Loading dialogRef={dialogRef} />
      <div className="welcome grid justify-center content-center text-center bg-[#2D11B7] rounded-tr-[10px] rounded-br-[10px] p-2 text-[#eee] gap-2 h-full">
        <h1 className="font-medium">Chnage password</h1>
        <p className="font-medium">
          Thank you for your cooperation, now you can change your password
        </p>
      </div>
    </div>
  );
}
