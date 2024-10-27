"use client"
import { signOut } from "next-auth/react"

export const Logout = async() => {

    await signOut({
            callbackUrl: "/login",
    })


}