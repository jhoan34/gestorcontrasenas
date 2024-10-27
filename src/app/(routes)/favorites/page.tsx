import { DataTableItems } from "@/components/Shared/datatableitems/datatableitems";
import { auth } from "../../../../auth";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";

export default async function Favorites() {
    const session = await auth()

    if(!session || !session.user?.email){
        redirect("/")
    }

    const user = await db.user.findUnique({
        where: {
            email: session?.user.email
        },
        include: {
            elements: {
                where: {
                    isFavourite: true
                },
                orderBy: {
                    createdAt: "desc"
                }
            }
        }
    })
    if(!user || !user.elements){
        redirect("/"); 
    }
    return (
        <div>
            <h1>lista de favoritos</h1>
            <DataTableItems elements={user.elements}/>
        </div>
    );
}