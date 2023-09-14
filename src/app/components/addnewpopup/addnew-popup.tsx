"use client";

import Modal from "react-modal";

import { useEffect, useState } from "react";
import { signIn, useSession } from "next-auth/react";
import TextInputField from "../input-fields/text-input-fields";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { BsFillPlusCircleFill } from "react-icons/bs";
import { Button, Input } from "@nextui-org/react";
import { AiFillEdit, AiFillSave } from "react-icons/ai";
import { GiCancel } from "react-icons/gi";
import { inputFieldValidation } from "@/app/utils/utils";
import { useSelector, useDispatch } from "react-redux";
import { updatebaseinfo } from "@/store/basinfo-update";

const AddnewPopup = ({
  title,
  id,
  pid,
  optionArray,
}: {
  title: string;
  id?: any;
  pid?: any;
  optionArray?: any;
}) => {
  const router = useRouter();
  const dispatch = useDispatch();

  //get pathname
  let pathname: string = "";

  try {
    pathname = window.location.href;
  } catch (error) {}

  if (pathname) {
    const r: number = pathname.indexOf("/", 9);
    if (r !== -1) {
      pathname = pathname.substring(0, r);
    }
  }

  const [isOpen, setIsOpen] = useState(false);

  const { data: session, status } = useSession();

  const [inputvalueid, setInputvalueid] = useState(id ?? "");
  const [inputvalue, setInputvalue] = useState("");

  const customStyles = {
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.6)",
      zIndex: 50,
    },
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
  };

  useEffect(() => {
    console.log("id", id);
    if (optionArray && id) {
      const foundElement = optionArray.find(
        (e: any) => e.value === parseFloat(id)
      );
      // console.log("foundElement", foundElement);
      setInputvalue(foundElement.name);
      setInputvalueid(id);
      // console.log("foundElement", foundElement);
    }
  }, [id]);

  const submitButtonHandler = async (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();
    // console.log("title",title,)
    console.log("inputvalueid", inputvalueid);
    if (inputvalueid) {
      update();
    } else {
      addnew();
    }
    dispatch(updatebaseinfo());
  };

  const addnew = async () => {
    const validation = inputFieldValidation({
      inputvalue,
    });

    if (validation == 0) {
      const response = await fetch(pathname + "/api/addnew-baseinfo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ inputvalue, title, pid }),
      });

      const res = await response.json();
      if (res == "SUCCESS") {
        setIsOpen(false);
        toast.success(`${title} created successfully!`, {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        setInputvalueid("");
        setInputvalue("");
      } else {
        toast.error("Error!", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }

      return res;
    }
  };

  const update = async () => {
    const validation = inputFieldValidation({
      inputvalue,
    });

    if (validation == 0) {
      const response = await fetch(pathname + "/api/addnew-baseinfo", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ inputvalueid, inputvalue, title, pid }),
      });

      const res = await response.json();
      if (res == "SUCCESS") {
        setIsOpen(false);
        toast.success(`${title} updated successfully!`, {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        setInputvalue(inputvalue);
      } else {
        toast.error("Error!", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }

      return res;
    }
  };

  return (
    <div>
      <span className="text-gray-500">
        {id ? (
          <Button
            isIconOnly
            color="warning"
            variant="faded"
            aria-label="Create Item"
          >
            <AiFillEdit
              className="inline-block h-9 w-9 text-indigo-700 hover:text-indigo-500 cursor-pointer"
              onClick={() => setIsOpen(true)}
            />
          </Button>
        ) : (
          <Button
            isIconOnly
            color="warning"
            variant="faded"
            aria-label="Create Item"
          >
            <BsFillPlusCircleFill
              onClick={() => setIsOpen(true)}
              className="inline-block h-6 w-6 text-indigo-700 hover:text-indigo-500 cursor-pointer"
            />
          </Button>
          // <BsFillPlusCircleFill
          //   className="inline-block h-9 w-9 text-indigo-700 hover:text-indigo-500 cursor-pointer"
          //   onClick={() => setIsOpen(true)}
          // />
        )}
      </span>
      {/* <button
        onClick={() => setIsOpen(true)}
        className="inline-flex items-center justify-center px-4 py-2 text-base font-medium leading-6 text-white whitespace-no-wrap bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600"
      >
        Sign in
      </button> */}
      <Modal
        isOpen={isOpen}
        onRequestClose={() => setIsOpen(false)}
        style={customStyles}
        ariaHideApp={false}
      >
        {/* <div className="pl-8 pb-3">
          <h1 className="text-xl text-purple-800">{title}</h1>
        </div> */}
        <div className="flex items-center justify-center pl-2 pr-2">
          <div className="mx-auto w-full max-w-[550px]">
            <div className="flex flex-wrap w-full">
              <div className="w-full px-1 py-2">
                <Input
                  type="text"
                  variant="flat"
                  label={title}
                  size="sm"
                  value={inputvalue}
                  className=""
                  onChange={(e) => setInputvalue(e.target.value)}
                />
              </div>
            </div>
            <div className="flex items-center justify-center">
              <div className="px-3">
                <Button
                  color="primary"
                  startContent={<AiFillSave />}
                  onClick={submitButtonHandler}
                >
                  Save
                </Button>
              </div>
              <div>
                <Button
                  color="default"
                  startContent={<GiCancel />}
                  onClick={() => setIsOpen(false)}
                >
                  Cancel
                </Button>
              </div>
              {/* <div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="inline-flex items-center justify-center px-4 py-2 text-base font-medium leading-6 text-white whitespace-no-wrap bg-red-600 border border-transparent rounded-md shadow-sm hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-600"
                >
                  Cancel
                </button>
              </div> */}
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};
export default AddnewPopup;
