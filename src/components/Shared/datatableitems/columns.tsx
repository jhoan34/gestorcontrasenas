"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Element } from "@prisma/client"
import { toast } from "@/hooks/use-toast"
import { Button } from "@/components/ui/button"
import { Copy, MoreHorizontal, User } from "lucide-react"
import { DropdownMenu, DropdownMenuLabel } from "@radix-ui/react-dropdown-menu"
import { DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type ColumPros = Element

export const columns: ColumnDef<ColumPros>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "typeElement",
    header: "TypeElement",
  },
  {
    accessorKey: "urlWebsite",
    header: "UrlWebsite",
  },
  {
    accessorKey: "directory",
    header: "Directory",
  },
  {
    accessorKey: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const password = row.original.password
      const username = row.original.username
      const onEditElement = () => {
        window.location.href = `/element/${row.original.id}`
      }
      const copyItemClipBoard = (item : string , name : string) => {
        navigator.clipboard.writeText(item)
        toast({
          title: `${name} copied`,
        })
      }

      return (
        <div className="flex gap-2 justify-center items-center">
            {
                password && (
                    <Copy className="w-4 h-4 cursor-pointer" onClick={() => copyItemClipBoard(password , "Password")}  />
                )
            }
            {
                username && (
                    <User className="w-4 h-4 cursor-pointer" onClick={() => copyItemClipBoard(username , "Username")}/>
                )
            }   
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="w-8 h-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal  className="w-4 h-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuLabel> Actions </DropdownMenuLabel>
                    <DropdownMenuItem onClick={onEditElement}>Edit</DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
      )
    }
  },
]
