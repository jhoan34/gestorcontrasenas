import { redirect } from "next/navigation";
import { auth } from "../../../../../auth";
import { db } from "@/lib/db";
import { FormEditElement } from "@/components/Shared/formEditElement";

export default async function ElementPage({ params }: {
    params : {elementId : string}
}) {
    const { elementId } = params; // Assuming params contains an 'id' from the route
    const session = await auth()

    if(!session || !session.user?.email){
        return redirect("/")
    }

    const element = await db.element.findUnique({
        where: {
            id: elementId
        }
    })
    console.log(element)
    if (!element){
        return redirect("/")
    }
    return (
        <div>
            <h1>Element Page </h1>
            <div>
                <FormEditElement dataElement={element} />
            </div>
        </div>
    );
}
