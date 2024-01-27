"use client"

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { FileType } from "@/typings"
import { Button } from "../ui/button"
import { PencilIcon, TrashIcon } from "lucide-react"
import { useAppStore } from "../../store/store"
import { DeleteModel } from "../DeleteModel"
import RenameModal from "../RenameModel"

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })


  const [setFileId, setFilename, setIsDeleteModelOpen, setIsRenameModelOpen] = useAppStore((state) => [
    state.setFileId,
    state.setFilename,
    state.setIsDeleteModelOpen,
    state.setIsRenameModelOpen,
  ])

  const openDeleteModel = (fileId: string) => {
    setFileId(fileId)
    setIsDeleteModelOpen(true)
  }
  const openRenameModel = (fileId: string, filename: string) => {
    setFileId(fileId)
    setFilename(filename)
    setIsRenameModelOpen(true)
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                  </TableHead>
                )
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >

                <DeleteModel/>
                <RenameModal/>
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {
                      cell.column.id === 'timestamp' ? (
                        <div className="flex flex-col">
                          <div>
                            {(cell.getValue() as Date).toLocaleDateString()}
                          </div>
                          <div className="text-sx text-gray-500">
                            {(cell.getValue() as Date).toLocaleTimeString()}
                          </div>
                        </div>
                      ) : cell.column.id === 'filename' ? (
                        <p onClick={() => {
                          openRenameModel(
                            (row.original as FileType).id,
                            (row.original as FileType).filename
                          )

                        }} className="underline flex items-center text-blue-500 hover:cursor-pointer">
                          {cell.getValue() as string}
                          <PencilIcon size={15} className="ml-3" />
                        </p>
                      ) : (

                        flexRender(cell.column.columnDef.cell, cell.getContext())
                      )
                    }
                  </TableCell>
                ))}

                <TableCell key={(row.original as FileType).id} >
                  <Button variant={'outline'}
                    onClick={() => {
                      openDeleteModel((row.original as FileType).id)
                    }}
                  >
                    <TrashIcon size={20} />
                  </Button>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                You have No Files.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}
