import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function PATCH(req: Request, { params }: { params: { itemid: string } }) {
    try {
        const { itemid } = params;
        const values = await req.json();

        if (!itemid) {
            return new NextResponse("unauthorized", { status: 401 });
        }

        // Evitar que userid se pase en los valores para actualizar
        const { userId, ...updateValues } = values;

        const element = await db.element.update({
            where: {
                id: itemid,
            },
            data: {
                ...updateValues, // Se actualizan solo los campos permitidos
            },
        });

        return new NextResponse(JSON.stringify(element), { status: 200 });

    } catch (error) {
        console.error(error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
