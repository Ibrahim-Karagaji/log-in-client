import { useContext, useRef, useState, useEffect } from "react";
import Loading from "./Loading";
import { CodeContext } from "../stateManagement/CodeState";
import checkCodeSevice from "../services/checkCodeService";
import { useNavigate } from "react-router-dom";

export default function CheckCode() {
  const dialogRef = useRef(null);
  const responseMessage = useRef(null);
  const code = useContext(CodeContext);
  const [inputCode, setInputCode] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (!code.code) {
      dialogRef.current.close();
      window.alert("The code has expired.");
      navigate("/sign-up");
      window.localStorage.removeItem("resetPasswordToken");
    }
  }, []);

  const handleCheckCode = async () => {
    dialogRef.current.showModal();
    const result = await checkCodeSevice(inputCode);

    if (result.error) {
      dialogRef.current.close();
      responseMessage.current.innerHTML = result.err.message;
      responseMessage.current.style.backgroundColor = "red";
      responseMessage.current.style.left = "20px";
      setTimeout(() => {
        responseMessage.current.style.left = "-900px";
      }, 3000);
    }

    if (result.ok) {
      navigate("/change-password");
    } else {
      dialogRef.current.close();
      window.alert("The code has expired.");
      navigate("/sign-up");
      window.localStorage.removeItem("resetPasswordToken");
    }
  };

  return window.localStorage.getItem("resetPasswordToken") ? (
    <div className="sign flex h-full w-full shadow-[0px_4px_12px_#2D11B7] rounded-[10px] !max-w-[900px] max-h-[900px] leading-[1.8]">
      <div className="grid content-center rounded-tl-[10px] rounded-bl-[10px] p-1 h-full">
        <h1 className="font-black text-center">Reset Password</h1>
        <p className="font-semibold text-center !text-[14px]">
          Please Enter The Code
        </p>
        <form
          onClick={(e) => e.preventDefault()}
          className="grid gap-5 !mt-[10px] !mb-[10px]"
        >
          <label className="flex gap-2 items-center shadow-[0px_4px_12px_#2D11B7] p-2 rounded-2xl !w-[95%]">
            <input
              onInput={(e) => setInputCode(e.target.value)}
              name="code"
              className="focus:outline-none focus:border-transparent !h-full"
              placeholder="enter the code"
              required
              type="text"
            />
          </label>
          <button
            onClick={() => {
              handleCheckCode();
            }}
            className="bg-[#2D11B7] !w-[45%] p-2 rounded-3xl text-[#eee] font-bold"
          >
            SEND CODE
          </button>
        </form>
      </div>
      <p
        className="fixed bottom-[50px] left-[-150px] duration-300 p-[5px] rounded-[5px] text-[#eee] font-normal !w-fit"
        ref={responseMessage}
      ></p>
      <Loading dialogRef={dialogRef} />
      <div className="welcome grid justify-center content-center text-center bg-[#2D11B7] rounded-tr-[10px] rounded-br-[10px] p-2 text-[#eee] h-full">
        <h1 className="font-medium">THE CODE</h1>
        <h1 className="!rotate-90">{"=>"}</h1>
        <h1 className="text-[#eeeeee25]">{code.code}</h1>
      </div>
    </div>
  ) : (
    <img src=" error-image.jpg" />
  );
}
