"use client";
import { cn } from '@/lib/utils';
import { useUser } from '@clerk/nextjs';
import { addDoc, collection, doc, serverTimestamp, updateDoc } from 'firebase/firestore';
import { useState } from 'react';
import DropzoneComponent from 'react-dropzone';
import { db, storage } from '../../fierbase';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { useToast } from './ui/use-toast';

function DropZone() {
    const {toast} = useToast()

    const [loading, setloading] = useState(false)
    const { isLoaded, isSignedIn, user } = useUser();

    const onDrop = (acceptedFiles: File[]) => {
        acceptedFiles.forEach(file => {
            const render = new FileReader()
            render.onabort = () => console.log('File rendering was aborted');
            render.onerror = () => console.log('File rendering failed');
            render.onload = async () => {
                await uploadPost(file)
            }
            render.readAsArrayBuffer(file)

        });
    };


    const uploadPost = async (selectedFile: File) => {
        if (loading) return;
        if (!user) return;


        setloading(true)
        const docRef = await addDoc(collection(db, 'users', user.id, 'files'), {
            userId: user.id,
            filename: selectedFile.name,
            fullName: user.fullName,
            profileImg: user.imageUrl,
            timestamp: serverTimestamp(),
            type: selectedFile.type,
            size: selectedFile.size,
        })

        toast({  description:'Uploaded Succsesfully!!!'})
        const imageref = ref(storage, `users/${user.id}/files/${docRef.id}`)

        await
         uploadBytes(imageref, selectedFile).then(async (snapshot) => {
            const downloadURL = await getDownloadURL(imageref);
            await updateDoc(doc(db, 'users', user.id, 'files', docRef.id), {
                downloadURL: downloadURL
            });
        });
        setloading(false)

    }

    const maxSize = 20971520;
    return (
        <DropzoneComponent minSize={0} maxSize={maxSize} onDrop={onDrop}>
            {({ getRootProps, getInputProps, isDragActive, isDragReject, fileRejections }) => {

                const isFileTooLarge = fileRejections.length > 0 && fileRejections[0].file.size > maxSize;

                return (<section className='m-4'>
                    <div {...getRootProps()} className={cn('w-full h-52 flex justify-center items-center p-5 border border-dashed text-center rounded-lg',
                        isDragActive ? 'bg-[#035FFE] text-white animate-pulse' : 'bg-slate-100/50 dark:bg-slate-800/80 text-slate-400')} >
                        <input {...getInputProps()} />
                        {!isDragActive && 'Click here or drop a file to upload!'}
                        {isDragActive && !isDragReject && 'Drop to upload this file!'}
                        {isDragReject && 'File type not accepted, sorry!'}
                        {isFileTooLarge && (
                            <div className='text-danger mt-2'>File is too large</div>
                        )}
                    </div>
                </section>)
            }
            }
        </DropzoneComponent>
    )
}

export default DropZone
