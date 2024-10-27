import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";

// Crear instancia de Uploadthing
const f = createUploadthing();

// Función de autenticación de ejemplo (simulada)
const auth = async (req: Request) => {
  // En una aplicación real, deberías implementar tu lógica de autenticación aquí
  return { id: "fakeId" }; // Devuelve un objeto de usuario simulado
};

// Definir el enrutador de archivos
export const ourFileRouter = {
  // Definir tantas rutas de archivos como necesites
  imageUploader: f({
    image: { maxFileSize: "4MB" } // Configuración de archivos (solo imágenes con tamaño máximo de 4MB)
  })
    // Middleware que se ejecuta antes de la subida
    .middleware(async ({ req }) => {
      // Autenticar al usuario
      const user = await auth(req);

      // Si no hay usuario autenticado, lanzar un error
      if (!user) throw new UploadThingError("Unauthorized");

      // Devolver datos que estarán disponibles en `metadata` tras la subida
      return { userId: user.id };
    })
    // Se ejecuta después de que se haya completado la subida del archivo
    .onUploadComplete(async ({ metadata, file }) => {
      // Mostrar el ID del usuario que subió el archivo y la URL del archivo
      console.log("Upload complete for userId:", metadata.userId);
      console.log("File URL:", file.url);

      // Puedes guardar el archivo en la base de datos o realizar otras acciones
      // Retornar cualquier dato que necesites enviar al cliente
      return { Url: file.url };
    }),
} satisfies FileRouter;

// Exportar el tipo del enrutador para su uso en otras partes del código
export type OurFileRouter = typeof ourFileRouter;
