import { auth } from "../../../../auth"
import { db } from "@/lib/db"
import { redirect } from "next/navigation"
import { DataTableItems } from "@/components/Shared/datatableitems/datatableitems"


export default async function LoginElements  ()  {
    const session = await auth()
    if(!session || !session.user?.email){
        return redirect("/")
    }
    const user = await db.user.findUnique({
        where: {
            email: session?.user.email
        },
        include: {
            elements: {
                where: {
                    typeElement: "Inicio de sesion"
                },
                orderBy: {
                    createdAt: "desc"
                }
            }
        }
    }) 

    if(!user || !user.elements){
        return redirect("/")
    }
    return (
        <div>
            <h1>lista de logins</h1>
            <DataTableItems elements={user.elements} />
        </div>
    )
}