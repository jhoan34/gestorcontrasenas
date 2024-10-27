import { redirect } from "next/navigation"
import { auth } from "../../../../auth"
import { db } from "@/lib/db"
import { FormProfile } from "./components/formProfile/formprofile"
export default async function Profile() {
    const session = await auth()

    if(!session?.user?.email ){
        redirect("/")
    }

    const userDb = await db.user.findUnique({
        where: {
            email : session.user.email
        },

    })

    if(!userDb ){
        redirect("/")
    }

    return (
        <div>
            <h1 className="text-xl">Acount details </h1>
            <FormProfile user={userDb} />
        </div>
    )
}