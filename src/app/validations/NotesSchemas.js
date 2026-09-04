import { z } from "zod";

export const notesSchema = z.object({
  title: z
    .string()
    .min(1, "El titulo es obligatorio")
    .max(40, "El titulo no puede superar los 40 caracteres"),
  content: z.string().min(10, "El contenido debe tener minimo 10 caracteres"),
  ejemplo: z.string().optional(),
  categoryId: z.string().min(1, "Debe seleccionar una categoria"),
});
