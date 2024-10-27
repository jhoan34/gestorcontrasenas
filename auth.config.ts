import type { NextAuthConfig } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { db } from "@/lib/db"; // Asegúrate de que la conexión con la base de datos funcione correctamente

export default {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials: any) {
        // Buscar el usuario en la base de datos
        const user = await db.user.findUnique({
          where: { email: credentials.email },
        });

        if (!user) {
          // Si no se encuentra el usuario, devuelve null
          throw new Error("No user found with the given email");
        }

        // Verificar la contraseña
        const isValidPassword = await bcrypt.compare(
          credentials.password,
          user.hashedPassword
        );

        if (!isValidPassword) {
          // Si la contraseña no es válida, devolver null
          throw new Error("Incorrect password");
        }

        // Si todo está bien, devolver el usuario
        return user;
      }, 
    })
  ],

} as NextAuthConfig;
