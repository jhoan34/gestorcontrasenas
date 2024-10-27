import { db } from "@/lib/db";
import { NextResponse } from "next/server";


export async function POST(req: Request) {
    try {
        const {
            typeElement,
            isFavourite,
            name,
            directory,
            username,
            password,
            urlWebsite,
            notes,
            userId,
        } = await req.json();


        const item = await db.element.create({
            data: {
                typeElement,
                isFavourite, // Usar el valor corregido
                name,
                directory,
                username,
                password,
                urlWebsite,
                notes,
                userId
            }
        });

        return new NextResponse(JSON.stringify(item), { status: 200 });
    } catch (error) {
        return new NextResponse("Something went wrong", { status: 500 });
    }
}
