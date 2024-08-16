"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Checkbox } from "@/components/ui/checkbox"
import { MoreHorizontal } from "lucide-react"
 
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { DataTableColumnHeader } from "@/components/column-header"

export type scholarship = {
  id: string
  status: string
  amount: string 
  deadline: string 
  name: string 
  requirements: string 
  link: string
}

export const statuses = [
      {
        value: "Not Started",
        label: "Not Started",
      },
      {
        value: "In Progress",
        label: "In Progress",
      },
      {
        value: "Submitted",
        label: "Submitted",
      },
      {
        value: "Accepted",
        label: "Accepted",
      },
      {
        value: "Rejected",
        label: "Rejected",
      },
]

export const columns: ColumnDef<scholarship>[] = [
    {
        id: "select",
        header: ({ table }) => (
          <Checkbox
            checked={
              table.getIsAllPageRowsSelected() ||
              (table.getIsSomePageRowsSelected() && "indeterminate")
            }
            onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
            aria-label="Select all"
          />
        ),
        cell: ({ row }) => (
          <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={(value) => row.toggleSelected(!!value)}
            aria-label="Select row"
          />
        ),
        enableSorting: false,
        enableHiding: false,
      },
      {
        accessorKey: "status",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Status" />
        ),

        filterFn: (row, id, value) => {
          return value.includes(row.getValue(id))
        },
      },
  {
    accessorKey: "amount",
    header: ({ column }) => 
        (
          <DataTableColumnHeader column={column} title="Amount" />
        ),

    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("amount"))
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount)
 
      return <div className="font-medium">{formatted}</div>
    },
  },
  {
    accessorKey: "deadline",
    header: ({ column }) => 
        (
            <DataTableColumnHeader column={column} title="Deadline" />
        ),
    cell: ({ row }) => {
        const date = new Date(row.getValue('deadline'))
        const formatted = date.toLocaleDateString()
        return formatted
    }
  },
  {
    accessorKey: "name",
    header: ({ column }) => 
        (
            <DataTableColumnHeader column={column} title="Scholarship Name" />
        ),
  },
  {
    accessorKey: "requirements",
    header: "Requirements/Info",
  },
  {
    accessorKey: "link",
    header: "Link",
    cell: ({ row }) => {
        const url = row.original.link;
        return <a className="text-blue-500"href={url} target="_blank" rel="noopener noreferrer">Link</a>
    }
  },

  {
    id: "actions",
    cell: ({ row }) => {
      const scholarship = row.original
 
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(scholarship.link)}
            >
              Copy Scholarship Link
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View/Add Notes</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]
