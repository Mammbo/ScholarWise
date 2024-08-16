"use client"

import * as React from "react"

import Image from 'next/image'

//Table Componenets
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getPaginationRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getSortedRowModel,
  getCoreRowModel,
  getFilteredRowModel,
  useReactTable,
} from "@tanstack/react-table"

//Table
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

// Column Visibility 
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"

import { Button } from "@/components/ui/button"

// Advanced Table Pagination 
import { DataTablePagination } from "@/components/data-table-pagination"
import downloadToCSV from "@/lib/xlsx"


import { DataTableToolbar } from "@/components/data-table-toolbar"
import { DataTableViewOptions } from "@/components/data-table-view-options"
 

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {

  // Sorting Var 
  const [sorting, setSorting] = React.useState<SortingState>([])
  // Filters var 
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  )
  //Column Visibility var 
  const [columnVisibility, setColumnVisibility] =
  React.useState<VisibilityState>({})
  // selection 
  const [rowSelection, setRowSelection] = React.useState({})

  const table = useReactTable({
    data,
    columns,
    enableRowSelection: true,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  })

  return (
    <>

  <h2 className="flex section-text">
              Scholarships
    </h2>
    {/*Actions bar*/}
    <div className="flex items-center">
        {/* Data Toolbar */}
        <DataTableToolbar table={table} />
        {/* Export to Excel */}
        <div className="py-4">
            <Button onClick={()=> downloadToCSV()} className="ml-4"> 
            <div> 
                <Image
                    src="/assets/icons/download.svg"
                    width={27}
                    height={27}
                    alt="logo"
                />
            </div>
            </Button>
        </div>
      
        {/* Column Visibility*/}
        <DataTableViewOptions table={table} />

        
    </div>
    {/* Table */}
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
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
    <DataTablePagination table={table} />
    </>
  )
}
 