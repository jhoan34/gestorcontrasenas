"use client";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { loginSchema } from "@/lib/zod";
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
import registerUserFormAction from "@/actions/formaction";
import { toast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

// Tipos inferidos desde el esquema de validación Zod
type LoginFormValues = z.infer<typeof loginSchema>;

export default function Login() {
    const router = useRouter();
    const form = useForm<LoginFormValues>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const onSubmit: SubmitHandler<LoginFormValues> = async (values) => {
        try {
            const data = await registerUserFormAction(values);
            console.log(data);
            toast({
                title: "Login Successful",
                description: "You have successfully logged in.",
            });
            form.reset({
                email: "",
                password: "",
            });
            router.push("/");
        } catch (error: any) {
            toast({
                title: error.response.data,
            })
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-500 to-blue-800">
            <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
                <h1 className="text-3xl font-bold text-center text-blue-800 mb-6">Login</h1>
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

                        <Button
                            type="submit"
                            className="w-full bg-blue-700 text-white font-semibold py-2 rounded-md hover:bg-blue-800"
                        >
                            Submit
                        </Button>
                    </form>
                </Form>
                <p className="text-center mt-6">¿No tenés una cuenta? <a className="hover:text-blue-800" href="/register">Registrate</a></p>
            </div>
        </div>
    );
}
