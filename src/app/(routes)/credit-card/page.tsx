import { auth } from "../../../../auth"
import { db } from "@/lib/db"
import { redirect } from "next/navigation"
import { DataTableItems } from "@/components/Shared/datatableitems/datatableitems"

export default async function CreditCard () {
    const session = await auth()
    if(!session || session.user?.email){
        return redirect("/")
    }

    const user = await db.user.findUnique({
        where: {
            email: session.user?.email ?? ""
        },
        include: {
            elements: {
                where: {
                    typeElement: "Tarjeta"
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
        <div className="py-10">
            <h1>lista de tarjetas</h1>
            <DataTableItems elements={user.elements}/>
        </div>
    )
}