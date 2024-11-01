"use client";
import {z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { registerSchema } from "@/lib/zod";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { toast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

// Tipos inferidos desde el esquema de validación Zod
type LoginFormValues = z.infer<typeof registerSchema>;

export default function Register() {
    const router = useRouter();
    const form = useForm<LoginFormValues>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            email: "",
            password: "",
            username: "",
        },
    });

    const onSubmit: SubmitHandler<LoginFormValues> = async (values) => {
        try {
            const response = await axios.post("/api/register", values);
            if (response.status === 200 || response.status === 201) {
                form.reset({
                    email: "",
                    password: "",
                    username: "",
                });
                router.push("/login");
            } else {
                console.log("Unexpected status code:", response.status);
            }
        } catch (err) {
            const errorMessage = axios.isAxiosError(err) && err.response?.data ? err.response.data : "An unexpected error occurred";
            toast({
                title: errorMessage,
            });
        }
    };
    

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-500 to-blue-800">
            <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
                <h1 className="text-3xl font-bold text-center text-blue-800 mb-6">Register</h1>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        {/* Campo de Email */}
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-blue-700">Email</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="email"
                                            placeholder="shadcn@example.com"
                                            className="border border-blue-300 focus:ring-2 focus:ring-blue-500 rounded-md"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormDescription className="text-sm text-blue-500">
                                        This is your email for login.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Campo de Password */}
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-blue-700">Password</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="password"
                                            placeholder="********"
                                            className="border border-blue-300 focus:ring-2 focus:ring-blue-500 rounded-md"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormDescription className="text-sm text-blue-500">
                                        Enter your password to log in.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="username"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-blue-700">Username</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="text"
                                            placeholder="camilo123"
                                            className="border border-blue-300 focus:ring-2 focus:ring-blue-500 rounded-md"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormDescription className="text-sm text-blue-500">
                                        Enter your username
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />


                        <Button
                            type="submit"
                            className="w-full bg-blue-700 text-white font-semibold py-2 rounded-md hover:bg-blue-800"
                        >
                            Submit
                        </Button>
                    </form>
                </Form>
                <p className="text-center mt-6">¿Ya tienes una cuenta? <a className="hover:text-blue-800" href="/login">Login</a></p>

            </div>
        </div>
    );
}
