
import { db } from "@/lib/db"; // Ensure this is your correct database import
import { NextResponse } from "next/server";
import { hash } from "bcrypt"; // Import the hash function

export async function POST(req: Request) {
    try {

        const { email, password, username } = await req.json();
        console.log( email, password, username)

        // Validate input
        if (!email || !password  || !username) {
            return new NextResponse("Email, username y contraseña son requeridos", { status: 400 });
        }
        if (password.length < 8) {
            return new NextResponse("La contraseña debe tener al menos 8 caracteres", { status: 400 });
        }
        if (username.length < 10) {
            return new NextResponse("El nombre de usuario debe tener al menos 9 caracteres", { status: 400 });
        }

        //check is user exists
        const userName = await db.user.findUnique({
            where: { 
                username,
            }
        })
        if (userName) {
            return new NextResponse("El nombre de usuario ya se encuentra en uso", { status: 409 });
        }


        if (!email.includes("@") || !email.includes(".")) {
            return new NextResponse("Email inválido", { status: 400 });
        }

        // Check if user already exists
        const user = await db.user.findUnique({
            where: { 
                email,
            }
        });
        if (user) {
            return new NextResponse("El email ya se encuentra en uso", { status: 409 });
        }

        // Hash the password
        const passwordHASH = await hash(password , 10);

        // Create new user
        const newUser = await db.user.create({
            data: {
                username,
                email,
                hashedPassword: passwordHASH 
            }
        });

        return new NextResponse(JSON.stringify(newUser), { status: 201 }); // Return the created user with 201 status
    } catch (error) {
        console.error("Error creating user:", error); // Log the error for debugging
        return new NextResponse("Something went wrong creating user", { status: 500 });
    }
}
