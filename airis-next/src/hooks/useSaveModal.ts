import {create}  from 'zustand';

interface SaveModalStore{
    isOpen : boolean,
    onOpen : ()=>void,
    onClose:()=>void;
};

const useSaveModal = create<SaveModalStore>((set)=>({
    isOpen : false,
    onOpen : () => set({isOpen:true}) ,
    onClose :() =>set({isOpen:false})
}));

export default useSaveModal;