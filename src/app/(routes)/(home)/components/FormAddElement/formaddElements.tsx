"use client"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import axios from "axios"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {Select , SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select"
import { formSchema } from "./formaddelement.form"
import { Checkbox } from "@/components/ui/checkbox"
import { Copy, Earth, Eye, Shuffle } from "lucide-react"
import {copyToClipboard} from "@/lib/clipboard"
import { useState } from "react"
import { generatePassword } from "@/lib/generatePassword"
import { toast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"
import { FormAddelementesTypes } from "./formaddelements.types"


export function FormAddElement( props: FormAddelementesTypes) {

  const {userId, closeDialogAndDropDown} = props
  const [showPassword, setShowPassword] = useState(false)
  const router = useRouter()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      typeElement: "",
      isFavourite: false,
      name: "",
      directory: "",
      username: "",
      password: "",
      urlWebsite: "",
      notes: "",
      userId
    },
  })
 
  // 2. Define a submit handler.
  async function onSubmit (values: z.infer<typeof formSchema>) {
    try {
        await axios.post("/api/items", values)
        toast({
            title: "Elemento agregado",
            description: "Se agrego el elemento correctamente",
        })
        form.reset({
            typeElement: "",
            isFavourite: false,
            name: "",
            directory: "",
            username: "",
            password: "",
            urlWebsite: "",
            notes: "",
        })
        router.refresh()
        closeDialogAndDropDown()
    } catch (error) {
        toast({
            title: "something went wrong",
            variant: "destructive",
        })
    }
  }

  const updateulr = () => {
    form.setValue("urlWebsite", window.location.href)
  }

  const generateRandomPassword = () => {
    const password = generatePassword()
    form.setValue("password", password)
  }
  return ( 
  <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="md:grid-cols-2 gap-y-2 gap-x-4 grid">
            <FormField
                control={form.control}
                name="typeElement"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Que tipo de elemento necesitas?</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select a directory for your password" />
                                </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                                <SelectItem value="Inicio de sesion">Inicio de sesion </SelectItem>
                                <SelectItem value="Tarjeta">Tarjeta</SelectItem>
                                <SelectItem value="Identidad">Identidad</SelectItem>
                            </SelectContent>
                        </Select>
                        <FormMessage />
                    </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name="isFavourite"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>¿Quieres seleccionar tu contraseña como favorita?</FormLabel>
                        <div className="flex flex-row items-start space-x-3 space-y-0 p-4">
                            <FormControl>
                                <Checkbox 
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                />
                            </FormControl>
                            <div className="space-y-1 leading-none">
                                <FormLabel>Marcar como favorito</FormLabel>
                            </div>
                        </div>

                        <FormMessage />
                    </FormItem>
                )}
            />
            <FormField 
                control={form.control}
                name="name"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Nombre</FormLabel>
                        <FormControl>
                            <Input placeholder="Nombre" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
                    
            
            />
            <FormField
                control={form.control}
                name="directory"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>directorio</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                                <SelectTrigger>
                                    <SelectValue placeholder="Elige el directorio" />
                                </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                                <SelectItem value="Social">Social</SelectItem>
                                <SelectItem value="Arts">Arts</SelectItem>
                                <SelectItem value="Shopping">Shopping</SelectItem>
                            </SelectContent>
                        </Select>
                        <FormMessage />
                    </FormItem>
                )}
            />
            <FormField 
                control={form.control}
                name="username"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Usuario</FormLabel>
                        <FormControl>
                            <div className="relative">
                                <Input placeholder="Nombre" {...field} />
                                <Copy className="absolute right-3 top-3 cursor-pointer" size={18} onClick={() => copyToClipboard(field.value)}/>
                                
                            </div>
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
            <FormField 
                control={form.control}
                name="urlWebsite"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>URL Website</FormLabel>
                        <FormControl>
                            <div className="relative">
                                <Input {...field} />
                                <Earth className="absolute right-3 top-3 cursor-pointer" size={18} onClick={updateulr}/>
                            </div>
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
                    
            
            />
            <FormField 
                control={form.control}
                name="password"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel className="flex justify-between">
                            Password 
                            <Shuffle className="cursor-pointer" size={18} onClick={() => generateRandomPassword()}/> 
                        </FormLabel>
                        <FormControl>
                            <div className="relative">
                                <Input {...field} type={showPassword ? "text" : "password"} />
                                <Eye className="absolute right-10 top-3 cursor-pointer" size={18} onClick={() => setShowPassword(!showPassword)}/>
                                <Copy className="absolute right-3 top-3 cursor-pointer" size={18} onClick={() => copyToClipboard(field.value)}/>
                            </div>
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}      
            
            />
            <div>
                <div className="text-slate-400 flex items-center justify-between text-sm">
                    Autentication totp
                    <p className="px-3 bg-green-700 text-white rounded-lg text-xs mr-5">Premium</p>
                </div>
                <Input disabled />
            </div>
            <FormField 
                control={form.control}
                name="notes"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Notas</FormLabel>
                        <FormControl>
                            <Textarea {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}      
            
            />
            <div/>
            <Button type="submit">Guardar</Button>
      </form>
    </Form>  
  )

}