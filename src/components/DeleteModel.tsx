"use client";

import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { useAppStore } from "@/store/store";
import { useUser } from "@clerk/nextjs";
import { db, storage } from "../../fierbase";
import { deleteObject, ref } from "firebase/storage";
import { deleteDoc, doc } from "firebase/firestore";
import { useToast } from "./ui/use-toast";



export function DeleteModel() {

    const { user } = useUser()
    const { toast } = useToast()



    const [isDeleteModelOpen, setIsDeleteModelOpen, fileId, setFileId] =
        useAppStore((state) => [
            state.isDeleteModelOpen,
            state.setIsDeleteModelOpen,
            state.fileId,
            state.setFileId
        ]);

    async function deleteFile() {
        if (!user || !fileId) return;
        const fileRef = ref(storage, `users/${user.id}/files/${fileId}`)

        try {
            deleteObject(fileRef).then(async () => {
                deleteDoc(doc(db, 'users', user.id, 'files', fileId))
            }).finally(() => {
                setIsDeleteModelOpen(false)
                toast({ variant:'destructive',  description:"Deleted Successfully !!!"});

            })

        } catch (error) {
            console.log(error)
            toast({ variant:'destructive',  description:"Error while Deleting !!!"});

            setIsDeleteModelOpen(false)
        }
    }
    return (
        <Dialog
            open={isDeleteModelOpen}
            onOpenChange={(isOpen) => {
                setIsDeleteModelOpen(isOpen)
            }}
        >

            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Are you sure you want to delete?</DialogTitle>
                    <DialogDescription>
                        This action cannot be undone. Thia will permanently delete your file!
                    </DialogDescription>
                </DialogHeader>
                <div className="flex space-x-2">
                    <Button
                        variant={'ghost'}
                        size='sm'
                        onClick={() => setIsDeleteModelOpen(false)}
                        className="px-3 flex-1"
                    >
                        <span className="sr-only">Cancel</span>
                        <span>cancel</span>
                    </Button>

                    <Button
                        onClick={() => deleteFile()}
                        variant={'destructive'}
                        className="px-3 flex-1"
                        size='sm'
                        type="submit"
                    >
                        <span className="sr-only">Delete</span>
                        <span>Delete</span>
                    </Button>


                </div>

            </DialogContent>
        </Dialog>
    )
}
