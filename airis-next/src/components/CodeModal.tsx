import React, { useCallback } from "react";
import { GiArtificialHive } from "react-icons/gi";

interface CodeModalProps {
  title?: string;
  bodyContent: React.ReactElement;
  onClose: () => void; // Add onClose as a prop
  isOpen: boolean; // Add isOpen as a prop for explicit control
}

const CodeModal: React.FC<CodeModalProps> = ({ title, bodyContent, onClose, isOpen }) => {
  const handleClose = useCallback(() => {
    onClose();
  }, [onClose]);

  if (!isOpen) {
    return null;
  }

  return (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none bg-neutral-800 bg-opacity-70">
        <div className="relative w-full lg:w-3/6 my-6 mx-auto lg:max-w-3xl h-full lg:h-auto p-24">
          <div className="h-full lg:h-auto border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-black outline-none focus:outline-none">
            <div className="flex items-center justify-between p-10 rounded-t">
              <div className="flex items-center space-x-4">
                <h3 className="text-3xl font-semibold text-white">{title}</h3>
              </div>
              <button
                onClick={handleClose}
                className="p-1 border-0 text-white hover:opacity-70 transition"
              >
                ✖
              </button>
            </div>
            {/* Updated Body Content with max height and scrolling */}
            <div className="relative p-10 flex-auto max-h-[75vh] overflow-y-auto">
              {bodyContent}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CodeModal;
