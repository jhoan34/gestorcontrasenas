import {object , string} from "zod"

export const loginSchema = object({
    email: string().min(1, "Email es obligatorio").email("Email inválido"),
    password: string().min(1, "Password es obligatorio"),
})

export const registerSchema = object({
    email: string().min(1, "Email es obligatorio").email("Email inválido"),
    password: string().min(1, "Password es obligatorio"),
    username: string().min(1, "Username es obligatorio"),
})