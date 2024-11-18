import { useCallback } from "react";
import { Button } from "./ui/button";
import { GiArtificialHive } from "react-icons/gi";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import HashLoader from "react-spinners/HashLoader";

interface ModalProps {
  isOpen?: boolean;
  onClose: () => void;
  onSubmit: (data: any) => Promise<void>;
  title?: string;
  body?: React.ReactElement;
  footer?: React.ReactElement;
  disabled?: boolean;
  submitType: string;
  isLoading: boolean;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  title,
  body,
  footer,
  disabled,
  submitType,
  isLoading
}) => {
  const handleClose = useCallback(() => {
    if (disabled) return;
    onClose();
  }, [disabled, onClose]);

  if (!isOpen) {
    return null;
  }

  return (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none bg-neutral-800 bg-opacity-70">
        <div className="relative w-full lg:w-3/6 my-6 mx-auto lg:max-w-3xl h-full lg:h-auto p-24">
          <div className={`h-full lg:h-auto border-0 rounded-lg shadow-lg relative flex flex-col w-full outline-none focus:outline-none ${
    isLoading ? '' : 'bg-black'
  }`}>
            {isLoading ? (
              <div className="flex justify-center items-center h-full">
                <HashLoader color="white" size={50} />
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between p-10 rounded-t">
                  <div className="flex items-center space-x-4">
                    <GiArtificialHive color="white" size={40} />
                    <h3 className="text-3xl font-semibold text-white">{title}</h3>
                  </div>

                  <button
                    onClick={handleClose}
                    className="p-1 border-0 text-white hover:opacity-70 transition"
                  >
                    ✖
                  </button>
                </div>

                <div className="relative p-10 flex-auto">{body}</div>

                <div className="flex flex-col gap-4 p-10">
                  <Button onClick={() => onSubmit({})}>{submitType}</Button>

                  <div className="flex items-center justify-center my-4">
                    <hr className="w-full border-t border-gray-300" />
                    <span className="px-2 text-gray-500">OR</span>
                    <hr className="w-full border-t border-gray-300" />
                  </div>

                  <Button variant="outline">
                    <div className="flex items-center justify-center gap-4">
                      <FcGoogle />
                      <p>{submitType} with Google</p>
                    </div>
                  </Button>

                  <Button variant="outline">
                    <div className="flex items-center justify-center gap-4">
                      <FaGithub />
                      <p>{submitType} with GitHub</p>
                    </div>
                  </Button>

                  <div>{footer}</div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
