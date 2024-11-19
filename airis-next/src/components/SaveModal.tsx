import React, { useCallback, useState } from "react";
import useSaveModal from "@/hooks/useSaveModal";
import { Button } from "@/components/ui/button"; 
import { Input } from "@/components/ui/input"; 

const SaveModal: React.FC = () => {
  const { isOpen, onClose } = useSaveModal();
  const [inputValue, setInputValue] = useState("");

  const handleClose = useCallback(() => {
    setInputValue("");
    onClose();
  }, [onClose]);

  const handleSave = () => {
    console.log("Saving as:", inputValue);
    handleClose();
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-30 outline-none focus:outline-none bg-neutral-800 bg-opacity-70">
      <div className="relative w-full max-w-md mx-auto my-6 p-6">
        <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-black outline-none focus:outline-none">
          <div className="flex items-center justify-between p-4 rounded-t">
            <h3 className="text-xl font-semibold text-white">Save As</h3>
          </div>
          <div className="relative p-4 flex flex-col space-y-4">
            
            <Input
              id="save-as"
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Enter name"
              className="p-2 rounded bg-neutral-700 text-white outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex items-center justify-end p-4 space-x-4">
            <Button
              onClick={handleClose}
              variant="secondary"
              className="text-white px-4 py-2 rounded hover:bg-gray-600 transition"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSave}
              className="text-white px-4 py-2 rounded hover:bg-blue-600 transition"
            >
              Save
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SaveModal;
