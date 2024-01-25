"use client"

import { FileType } from "@/typings"
import { ColumnDef } from "@tanstack/react-table"
import Link from "next/link"
import prettyBytes from "pretty-bytes"
import { FileIcon, defaultStyles,} from 'react-file-icon'
// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.


export const columns: ColumnDef<FileType>[] = [
    {
        accessorKey: "type",
        header: "Type",
        cell: ({ renderValue, ...props }) => {
            const type = renderValue() as string;
            const extension: string = type.split('/')[1];

            return (
                <div className="w-10">
                    <FileIcon
                        extension={extension}
                        //@ts-ignore
                        {...defaultStyles[extension]}
                    />
                </div>)
        }
    },
    {
        accessorKey: "filename",
        header: "File Name",
    },
    {
        accessorKey: "timestamp",
        header: "Date Added",
    },
    {
        accessorKey: "size",
        header: "Size",
        cell: ({ renderValue, ...props }) => {
            return <span>{prettyBytes(renderValue() as number)}</span>
        }
    },
    {
        accessorKey: "downloadURL",
        header: "Link",
        cell: ({ renderValue, ...props }) => {
            return <Link href={renderValue() as string} target="_blank"
                className="text-blue-500 hover:text-blue-700">
                Download
            </Link>
        }
    },

]



