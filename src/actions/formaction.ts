"use server"

import { signIn } from "../../auth"
const registerUserFormAction = async ({email, password} : {email:string, password: string}  ) => {
    await signIn("credentials", {
        email: email,
        password: password,
        callbackUrl: "/",
    })
}

export default registerUserFormAction