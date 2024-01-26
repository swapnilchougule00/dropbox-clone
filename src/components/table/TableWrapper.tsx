'use client';
import { FileType } from '@/typings'
import React, { useEffect, useState } from 'react'
import { Skeleton } from "@/components/ui/skeleton"

import { Button } from '../ui/button'
import { DataTable } from './Table'
import { columns } from './columns';
import { useUser } from '@clerk/nextjs';
import { useCollection } from 'react-firebase-hooks/firestore';
import { collection, orderBy, query } from 'firebase/firestore';
import { db } from '../../../fierbase';

function TableWrapper({ skeletonFiles }: { skeletonFiles: FileType[] }) {
    const { user } = useUser();
    const [initialFiles, setInitialfiles] = useState<FileType[]>([])
    const [sort, setSort] = useState<'asc' | 'desc'>('desc')

    const [docs, loading, error] = useCollection(
        user && query(
            collection(db, 'users', user.id, 'files'),
            orderBy('timestamp', sort)
        )
    );

    useEffect(() => {
        if (!docs) return;
        const files: FileType[] = docs.docs.map(doc => ({
            id: doc.id,
            filename: doc.data().filename || doc.id,
            timestamp: new Date(doc.data().timestamp?.seconds * 1000) || undefined,
            fullName: doc.data().fullName,
            downloadURL: doc.data().downloadURL,
            type: doc.data().type,
            size: doc.data().size,
        }));

        setInitialfiles(files)
    }, [docs])

    if (docs?.docs.length === undefined) return (
        <div className='flex-flex-col w-full'>
            <Button variant={'outline'} className='ml-auto float-right w-36 h-10 mb-5'>
                <Skeleton className='h-5 w-fll' />
            </Button>
            <div>
                <div className=' rounded-lg'>
                    {skeletonFiles.map((file) => (
                        <div className='flex items-center space-y-1 space-x-4 w-full'>
                            <Skeleton className='h-12 w-20' />
                            <Skeleton className='h-12 w-full' />
                        </div>
                    ))}

                    {skeletonFiles.length === 0 && (
                        <div className='flex items-center space-x-4 w-full'>
                            <Skeleton className='h-12 w-12' />
                            <Skeleton className='h-12 w-full' />
                        </div>
                    )}
                </div>
            </div>
        </div>
    )

    return (
        <div className='flex flex-col space-y-4 pb-8'>
            <Button variant={'outline'} className='ml-auto w-fit'
                onClick={() => setSort(sort === 'desc' ? 'asc' : 'desc')}
            >Sort By {sort === 'desc' ? 'Newest' : 'Oldest'}</Button>
            <DataTable columns={columns} data={initialFiles} />
        </div>
    )
}

export default TableWrapper
