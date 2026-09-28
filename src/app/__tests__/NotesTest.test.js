import { describe, it, expect } from "vitest";
import { notesSchema } from "../validations/NotesSchemas";

describe("Pruebas para notesSchema", () => {
  it("debe fallar si el titulo esta vacio", () => {
    const invalidData = {
      title: "",
      content: "Contenido valido con mas de 10 caracteres",
      categoryId: "cat_123",
    };
    const result = notesSchema.safeParse(invalidData);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe("El titulo es obligatorio");
    }
  });

  it("El titulo supera los 40 caracteres", () => {
    const invalidData = {
      title: "A".repeat(41),
      content: "Contenido valido conma s de 10 caracteres",
      categoryId: "cat_123",
    };
    const result = notesSchema.safeParse(invalidData);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe(
        "El titulo no puede superar los 40 caracteres",
      );
    }
  });

  it("Debe fallar si el contenido es menor a 10 caracteres", () => {
    const invalidData = {
      title: "A".repeat(10),
      content: "corto",
      categoryId: "cat_123",
    };
    const result = notesSchema.safeParse(invalidData);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe(
        "El contenido debe tener minimo 10 caracteres",
      );
    }
  });

  it("Debe fallar si no se selecciona una categoria", () => {
    const invalidData = {
      title: "A".repeat(10),
      content: "pasamos los diez caracteres de ejemplo",
      categoryId: "",
    };
    const result = notesSchema.safeParse(invalidData);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe(
        "Debe seleccionar una categoria",
      );
    }
  });

  it("Debe permitir crear la nota sin el campo ejemplo", () => {
    const invalidData = {
      title: "A".repeat(10),
      content: "pasamos los diez caracteres de ejemplo",
      categoryId: "cat_123",
    };
    const result = notesSchema.safeParse(invalidData);
    expect(result.success).toBe(true);
  });
});
