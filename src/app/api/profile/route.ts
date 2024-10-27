import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function PATCH(req: Request) {
    try {
        const body = await req.json();
        console.log(body);  // Para depuración, puedes eliminarlo en producción
        const { name, email, profileImage, username, id } = body;  // Usa `body` directamente

        // Validación de los campos necesarios
        if (!name || !email || !profileImage || !username || !id) {
            return new NextResponse("Bad Request: Missing fields", { status: 400 });  // Cambié el estado a 400
        }

        // Intenta actualizar el perfil en la base de datos
        const profile = await db.user.update({
            where: {
                id,
            },
            data: {
                name,
                email,
                profileImage,
                username,
            },
        });
        if(profile ) {
            console.log("Perfil actualizado correctamente:", profile);  // Imprime el perfil actualizado en la consola para depuración
        }
        // Devuelve el perfil actualizado
        return NextResponse.json(profile);
    } catch (error) {
        console.error("Error updating profile:", error);  // Imprime el error en la consola para depuración
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}
