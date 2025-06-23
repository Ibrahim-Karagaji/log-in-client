import { useContext, useState, useRef, useEffect } from "react";
import { UserContext } from "../stateManagement/UserState";
import updateService from "../services/updateService";
import Loading from "./Loading";

export default function UserProfile() {
  const user = useContext(UserContext);
  const responseMessage = useRef(null);
  const dialogRef = useRef(null);

  const [changeInfo, setchangeInfo] = useState({
    name: "",
    email: "",
  });

  const [changeInfoState, setchangeInfoState] = useState({
    isChangeName: false,
    isChangeEmail: false,
  });

  useEffect(() => {
    responseMessage.current.style.backgroundColor = "green";
    responseMessage.current.style.left = "20px";
    setTimeout(() => {
      responseMessage.current.style.left = "-900px";
    }, 3000);
  }, []);

  const updateInfo = async () => {
    dialogRef.current.showModal();
    const result = await updateService(changeInfo);

    if (!result.ok) {
      dialogRef.current.close();
      responseMessage.current.innerHTML = result.message;
      responseMessage.current.style.backgroundColor = "red";
      responseMessage.current.style.left = "20px";
      setTimeout(() => {
        responseMessage.current.style.left = "-900px";
      }, 3000);
    } else {
      user.setUserState((prev) => {
        return { ...prev, name: result.user.name, email: result.user.email };
      });
      dialogRef.current.close();
      responseMessage.current.innerHTML = result.message;
      responseMessage.current.style.backgroundColor = "green";
      responseMessage.current.style.left = "20px";
      setTimeout(() => {
        responseMessage.current.style.left = "-900px";
      }, 3000);
      setchangeInfoState(() => {
        return {
          isChangeName: false,
          isChangeEmail: false,
        };
      });
    }
  };

  return (
    <div className="userProfile relative grid shadow-[0px_4px_12px_#2D11B7] p-2 rounded-[5px] !max-w-[400px] !mt-[100px]">
      <button
        onClick={() => {
          window.localStorage.removeItem("token");
          window.location.reload();
        }}
        className="left-1 top-1 absolute p-2 rounded-[5px] text-[#eee] bg-[#2D11B7] !w-fit duration-200 hover:bg-[#1a067d]"
      >
        LOG OUT
      </button>
      <img
        src="public/avatar.png"
        className="!max-w-[150px] !max-h-[150px] !ml-full"
      />
      <div className="grid gap-1">
        <div className="flex gap-1 justify-center items-center border-b-2 border-b-[#2D11B7]">
          <p className="flex-1 !text-[18px] font-semibold">name: </p>
          <p>{user.userState.name}</p>
        </div>
        {changeInfoState.isChangeName ? (
          <div>
            <input
              onInput={(e) => {
                setchangeInfo((prev) => {
                  return { ...prev, name: e.target.value };
                });
              }}
              type="text"
              placeholder="Enter Your New Name"
              className="border-b-1 border-b-[#2D11B7] focus:outline-none focus:border-b-1 text-[16px]"
            />
            <div className="flex gap-2 !mt-[10px]">
              <button
                onClick={() => {
                  updateInfo();
                }}
                className="flex-1 bg-[#2D11B7] text-[#eee] p-1 rounded-[5px] duration-200 hover:bg-[#1a067d]"
              >
                Change
              </button>
              <button
                className="text-start bg-[#2D11B7] text-[#eee] p-1 rounded-[5px] duration-200 hover:bg-[#1a067d] !w-fit"
                onClick={() => {
                  setchangeInfo((prev) => {
                    return { ...prev, name: "" };
                  });
                  setchangeInfoState((prev) => {
                    return { ...prev, isChangeName: false };
                  });
                }}
              >
                Cancle
              </button>
            </div>
          </div>
        ) : (
          <button
            onClick={() => {
              setchangeInfoState((prev) => {
                return { ...prev, isChangeName: true };
              });
            }}
            className="flex p-1 rounded-[5px] text-[#eee] font-semibold bg-[#2D11B7] duration-200 hover:bg-[#1a067d]"
          >
            <p>CHANGE YOUR NAME</p>
          </button>
        )}
        <div className="flex gap-1 justify-center items-center border-b-2 border-b-[#2D11B7]">
          <p className="flex-1 !text-[18px] font-semibold">email: </p>
          <p>{user.userState.email}</p>
        </div>
        {changeInfoState.isChangeEmail ? (
          <div>
            <input
              onInput={(e) => {
                setchangeInfo((prev) => {
                  return { ...prev, email: e.target.value };
                });
              }}
              type="text"
              placeholder="Enter Your New Email"
              className="border-b-1 border-b-[#2D11B7] focus:outline-none focus:border-b-1 text-[16px]"
            />
            <div className="flex gap-2 !mt-[10px]">
              <button
                onClick={updateInfo}
                className="flex-1 bg-[#2D11B7] text-[#eee] p-1 rounded-[5px] duration-200 hover:bg-[#1a067d]"
              >
                Change
              </button>
              <button
                className="text-start bg-[#2D11B7] text-[#eee] p-1 rounded-[5px] duration-200 hover:bg-[#1a067d] !w-fit"
                onClick={() => {
                  setchangeInfo((prev) => {
                    return { ...prev, email: "" };
                  });

                  setchangeInfoState((prev) => {
                    return { ...prev, isChangeEmail: false };
                  });
                }}
              >
                Cancle
              </button>
            </div>
          </div>
        ) : (
          <button
            onClick={() => {
              setchangeInfoState((prev) => {
                return { ...prev, isChangeEmail: true };
              });
            }}
            className="flex p-1 rounded-[5px] text-[#eee] font-semibold bg-[#2D11B7] duration-200 hover:bg-[#1a067d]"
          >
            <p>CHANGE YOUR EMAIL</p>
          </button>
        )}
      </div>
      <p
        className="fixed bottom-[50px] left-[-150px] duration-300 p-[5px] rounded-[5px] text-[#eee] font-semibold !w-fit"
        ref={responseMessage}
      >
        Welcome
      </p>
      <Loading dialogRef={dialogRef} />
    </div>
  );
}
