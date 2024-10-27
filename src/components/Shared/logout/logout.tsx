"use client"
import {Button} from "@/components/ui/button"
import { signOut } from "next-auth/react"

export const Logout = async() => {

    await signOut({
            callbackUrl: "/login",
    })


}