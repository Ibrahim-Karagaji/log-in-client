import { Link, useNavigate } from "react-router-dom";
import { useState, useRef, useContext } from "react";
import resetPasswordCode from "../services/resetPasswordCodeService";
import Loading from "./Loading";
import { CodeContext } from "../stateManagement/CodeState";

export default function ResetPassword() {
  const dialogRef = useRef(null);
  const [email, setEmail] = useState("");
  const responseMessage = useRef(null);
  const navigate = useNavigate();
  const code = useContext(CodeContext);

  const handleResetPassword = async () => {
    dialogRef.current.showModal();
    const reslut = await resetPasswordCode(email);

    if (reslut.error) {
      dialogRef.current.close();
      responseMessage.current.innerHTML = reslut.err.message;
      responseMessage.current.style.backgroundColor = "red";
      responseMessage.current.style.left = "20px";
      setTimeout(() => {
        responseMessage.current.style.left = "-900px";
      }, 3000);
      return;
    }
    if (reslut.ok) {
      window.localStorage.setItem(
        "resetPasswordToken",
        `Bearer ${reslut.token}`
      );
      code.setCode(reslut.resetCode);
      navigate("/check-code");
    }
  };

  return (
    <div className="sign flex h-full w-full shadow-[0px_4px_12px_#2D11B7] rounded-[10px] !max-w-[900px] max-h-[900px] leading-[1.8]">
      <div className="grid content-center rounded-tl-[10px] rounded-bl-[10px] p-1 h-full">
        <h1 className="font-black text-center">Hello</h1>
        <p className="font-semibold text-center !text-[14px]">
          Enter Your Email To You Can Reset Your Password
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
              width="24px"
              fill="#2D11B7"
              className="bg-[#eee] h-8 !w-auto"
            >
              <path d="m480-920 362 216q18 11 28 30t10 40v434q0 33-23.5 56.5T800-120H160q-33 0-56.5-23.5T80-200v-434q0-21 10-40t28-30l362-216Zm0 466 312-186-312-186-312 186 312 186Zm0 94L160-552v352h640v-352L480-360Zm0 160h320-640 320Z" />
            </svg>
            <input
              onInput={(e) => setEmail(e.target.value)}
              name="email"
              className="focus:outline-none focus:border-transparent !h-full"
              placeholder="Your email"
              required
              type="email"
            />
          </label>
          <button
            onClick={() => {
              handleResetPassword();
            }}
            className="bg-[#2D11B7] !w-[45%] p-2 rounded-3xl text-[#eee] font-bold"
          >
            SIGN IN
          </button>
        </form>
        <Link to={"/sign-up"}>
          <p className="text-[#2D11B7] text-center font-semibold">
            Don’t have an account? Sign up
          </p>
        </Link>
      </div>
      <p
        className="fixed bottom-[50px] left-[-150px] duration-300 p-[5px] rounded-[5px] text-[#eee] font-normal !w-fit"
        ref={responseMessage}
      ></p>
      <Loading dialogRef={dialogRef} />
      <div className="welcome grid justify-center content-center text-center bg-[#2D11B7] rounded-tr-[10px] rounded-br-[10px] p-2 text-[#eee] gap-2 h-full">
        <h1 className="font-medium"> Reset Your Password</h1>
        <p className="font-medium">
          We understand that forgetting a password can happen to anyone so don't
          worry.
        </p>
      </div>
    </div>
  );
}
