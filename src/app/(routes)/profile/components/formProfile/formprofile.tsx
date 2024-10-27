"use client";

import { z } from "zod";
import { FormProfileProps } from "./formprofile.types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { formSchemaProfile } from "./profile.form";
import { useState } from "react";
import { UploadButton } from "@/lib/uploadthing"; 
import { toast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import axios from "axios";

export const FormProfile = (props: FormProfileProps) => {
  const { user } = props;
  const [showPhoto, setShowPhoto] = useState(false);
  const [photoUploaded, serPhothoUploaded] = useState(false)
  const router = useRouter()
  // Inicializar el formulario con valores por defecto y validación Zod
  const form = useForm<z.infer<typeof formSchemaProfile>>({
    resolver: zodResolver(formSchemaProfile),
    defaultValues: {
      name: user.name ?? "",
      email: user.email ?? "",
      profileImage: user.profileImage ?? "",
      username: user.username ?? "",
      id: user.id ?? "",
    },
  });

  // Manejador de envío del formulario
  async function onSubmit(values: z.infer<typeof formSchemaProfile>) {
    try {
        await axios.patch("/api/profile", values)
        toast({
            title: "Profile Update with success"
        })
        router.refresh()
        setShowPhoto(false)
        serPhothoUploaded(false)
    } catch (error) {
        toast({
            title: "algo paso al enviar el formulario",
            variant: "destructive"
        })
    }
  }

  return (
    <div className="max-w-lg">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          {/* Campo de imagen de perfil */}
          <FormField
            control={form.control}
            name="profileImage"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Profile Image</FormLabel>
                <FormControl>
                  <div className="flex gap-2 items-center">
                        {/* Mostrar imagen de perfil o imagen por defecto */}
                        <img
                        className="rounded-full"
                        src={user.profileImage ? user.profileImage : "/imgs/user.png"}
                        alt="User Profile"
                        width={50}
                        height={50}
                        />
                        <div className="w-[200px] ">
                            {showPhoto ? (
                                // Botón de subida de imagen
                                <UploadButton
                                    {...field}
                                    endpoint="imageUploader"
                                    onClientUploadComplete={(res) => {
                                        serPhothoUploaded(true);
                                        form.setValue("profileImage", res[0]?.url); // Actualizar imagen en el formulario
                                    }}
                                />
                            ) : (
                                <Button onClick={() => setShowPhoto(true)}>Change Photo</Button>
                            )}
                        </div>
                        {photoUploaded && (
                            <p className="text-sm">Image Uploaded</p>
                        )}
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          {/* Campo de email */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input disabled {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Campo de nombre */}
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="deadpool" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Campo de nombre de usuario */}
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="jhoandev" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  );
};
