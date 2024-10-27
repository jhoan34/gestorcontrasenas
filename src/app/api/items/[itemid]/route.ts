import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function PATCH(
  req: Request,
  { params }: { params: { itemid: string } }
) {
  try {
    const { itemid } = params;
    const values = await req.json();

    if (!itemid) {
      return new NextResponse("unauthorized", { status: 401 });
    }

    // Rename userId to _userId to avoid the unused variable warning
    const { ...updateValues } = values;

    const element = await db.element.update({
      where: {
        id: itemid,
      },
      data: {
        ...updateValues, // Only the allowed fields are updated
      },
    });

    return new NextResponse(JSON.stringify(element), { status: 200 });
  } catch (error) {
    console.error(error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
