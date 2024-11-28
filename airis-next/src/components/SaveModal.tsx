import React, { useCallback, useState } from "react";
import useSaveModal from "@/hooks/useSaveModal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import useUserStore from "../hooks/useUserStore";
import { Edge } from "@xyflow/react";

interface SavedItem {
  id: string;
  name: string;
  prompt: string;
  nodes?: Node[];
  edges?: Edge[];
  terraform: string;
  email : ''
}

interface SaveModalProps {
  prompt?: string;
  terraform: string;
}

const SaveModal: React.FC<SaveModalProps> = ({ prompt, terraform }) => {
  const { isOpen, onClose } = useSaveModal();
  const [inputValue, setInputValue] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  const user = useUserStore((state: any) => state.user);
  const addSavedItem = useUserStore((state: any) => state.addSavedItem);
  const handleClose = useCallback(() => {
    setInputValue("");
    onClose();
  }, [onClose]);

  const handleSave = async () => {
    if (!inputValue.trim()) {
      alert("Name cannot be empty");
      setInputValue("");
      return;
    }

    try {
      setIsLoading(true);
      const saveItem: SavedItem = {
        id: "",
        name: inputValue,
        prompt: prompt || "",
        terraform : terraform,
        email: user?.email || "",
      };

      const token = localStorage.getItem("token");

      if (!token || !user) {
        alert("You have logged out!");
        router.push("/");
        return;
      }

      const response = await fetch("https://airis-backend.onrender.com/save", {
        method: "POST",
        headers: {
          token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(saveItem),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      alert("Save successful!");
      handleClose();
    } catch (err) {
      console.error("Error:", err);
      alert("Something went wrong while saving. Please try again.");
    } finally {
      setIsLoading(false);
    }
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
              disabled={isLoading}
            />
          </div>
          <div className="flex items-center justify-end p-4 space-x-4">
            <Button
              onClick={handleClose}
              variant="secondary"
              className="text-white px-4 py-2 rounded hover:bg-gray-600 transition"
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button
              onClick={handleSave}
              className="text-white px-4 py-2 rounded hover:bg-blue-600 transition"
              disabled={isLoading}
            >
              {isLoading ? "Saving..." : "Save"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SaveModal;
