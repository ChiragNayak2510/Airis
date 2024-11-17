import {create}  from 'zustand';

interface CodeModalStore{
    isOpen : boolean,
    onOpen : ()=>void,
    onClose:()=>void;
};

const useCodeModal = create<CodeModalStore>((set)=>({
    isOpen : false,
    onOpen : () => set({isOpen:true}) ,
    onClose :() =>set({isOpen:false})
}));

export default useCodeModal;