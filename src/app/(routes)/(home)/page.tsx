import { auth } from "../../../../auth";
import { HeaderMain } from "./components/HeaderMain";
import { TableData } from "./components/tabledata";
import {db} from "@/lib/db";
import { redirect } from "next/navigation";
;

export default async function Home() {
  const session = await auth()
  console.log( session?.user?.email )
  const data = await db.user.findFirst({
    where: {
      email: session?.user?.email
    },
    include: {
      elements : {
        orderBy: {
          createdAt: "desc"
        }
      }
    }
    
  })
  console.log(data)
  if (!data || !data.elements) {
    return redirect("/")
  }
  return (
    <div className="flex flex-col h-screen">
      <HeaderMain userId={data?.id}/>
      <TableData elements={data?.elements}/>
    </div>
  )

}
