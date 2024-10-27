import { countPassword } from "@/lib/countPassword"
import { auth } from "../../../../auth"
import { db } from "@/lib/db"
import { redirect } from "next/navigation"
import { RepeatedPasswordsChart } from "./components/repeatedPasswordsChar"
import { PieChart } from "./components/piechart"

export default async function Analytics () {
    const session = await auth()
    if(!session || !session.user?.email){
        return redirect("/")
    }

    const user = await db.user.findUnique({
        where: {
            email: session?.user?.email
        },
        include: {
            elements: {
                orderBy: {
                    createdAt: "desc"
                }
            }
        }
    })

    if(!user || !user.elements){
        return redirect("/")
    } 

    const {unique , repeated} = countPassword(user.elements)

    return (
        <div>
            <div className="grid md:grid-cols-2 gap-5 mb-4  ">
                <RepeatedPasswordsChart repeated={repeated} unique={unique}/>
                <PieChart  repeated={repeated} unique={unique} />
            </div>
            <div>block</div>
        </div>
    )
}