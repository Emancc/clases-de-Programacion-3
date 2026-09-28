import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import { it, describe, expect, vi, beforeEach } from "vitest";

import CreateNotePage from "../notes/create/page";

const mockPush = vi.fn();
vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}));

const mockAddNote = vi.fn();
const mockGetDynamicCategories = vi.fn().mockReturnValue([
  { id: "cat_1", title: "ejemplo" },
  { id: "cat_2", title: "ejemplo2" },
]);

vi.mock("../context/NotesContext", () => ({
  useNotes: () => ({
    addNote: mockAddNote,
    getDynamicCategories: mockGetDynamicCategories,
  }),
}));

describe("Prueba de integracion para: CreateNotePage", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("debe guardar la nota y redirigir a /notes si la info es valida", async () => {
    render(<CreateNotePage />);

    fireEvent.change(screen.getByPlaceholderText("Title"), {
      target: { value: "Titulo OK" },
    });

    fireEvent.change(screen.getByRole("combobox"), {
      target: { value: "cat_1" },
    });

    fireEvent.change(screen.getByPlaceholderText("Content"), {
      target: { value: "Contenido valido con mas de 10 caracteres" },
    });

    fireEvent.change(screen.getByPlaceholderText("Const variable = ...."), {
      target: { value: "Const variable = 10" },
    });

    fireEvent.click(screen.getByRole("button", { name: /save/i }));

    await waitFor(() => {
      expect(mockAddNote).toHaveBeenCalledTimes(1);
      expect(mockAddNote).toHaveBeenCalledWith({
        title: "Titulo OK",
        content: "Contenido valido con mas de 10 caracteres",
        ejemplo: "Const variable = 10",
        categoryId: "cat_1",
      });
      expect(mockPush).toHaveBeenCalledWith("/notes");
    });
  });
});
