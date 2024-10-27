"use server"

import { signIn } from "../../auth"
const registerUserFormAction = async (data: any ) => {
    console.log(data)
    await signIn("credentials", {
        email: data.email,
        password: data.password,
        callbackUrl: "/",
    })
}

export default registerUserFormAction