import { create } from "zustand";

interface AppState {
    isDeleteModelOpen :boolean;
    setIsDeleteModelOpen : (open:boolean)=>void;

    isRenameModelOpen:boolean;
    setIsRenameModelOpen: (open:boolean)=>void;

    fileId: string | null;
    setFileId: (fileId:string) => void;

    filename:string;
    setFilename: (filename:string)=>void
}


export const useAppStore = create<AppState>()((set) => ({
    fileId: null,
    setFileId: (fileId: string) => set((state) => ({ fileId })),
  
    filename: "",
    setFilename: (filename: string) => set((state) => ({ filename })),
  
  
    isDeleteModelOpen: false,
    setIsDeleteModelOpen: (open) => set((state) => ({ isDeleteModelOpen: open })),
  
    isRenameModelOpen: false,
    setIsRenameModelOpen: (open) => set((state) => ({ isRenameModelOpen: open })),
  }));