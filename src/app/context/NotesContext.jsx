"use client";
import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const NotesContext = createContext();

export function NotesProvider({ children }) {
  const [notes, setNotes] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const [notesRes, categoriesRes] = await Promise.all([
          axios.get("/api/notes"),
          axios.get("/api/categories"),
        ]);

        setNotes(notesRes.data);
        setCategories(categoriesRes.data);
      } catch (err) {
        console.error("Error al obtener los datos", err);
      } finally {
        setIsMounted(true);
      }
    };
    fetchInitialData();
  }, []);

  const addNote = async (note) => {
    try {
      const response = await axios.post("/api/notes", note);
      setNotes((prevNotes) => [response.data, ...prevNotes]);
    } catch (err) {
      console.error("error al crear la nota", err);
    }
  };

  const updateNote = async (id, updatedFields) => {
    try {
      const response = await axios.put(`/api/notes/${id}`, updatedFields);
      setNotes((prevNotes) =>
        prevNotes.map((note) =>
          String(id) === String(note.id) ? response.data : note,
        ),
      );
    } catch (err) {
      console.error("error al actualizar la nora", err);
    }
  };

  const deleteNote = async (id) => {
    try {
      await axios.delete(`/api/notes/${id}`);
      setNotes((prevNotes) =>
        prevNotes.filter((note) => String(note.id) !== String(id)),
      );
    } catch (err) {
      console.error("Error al borrar la nota", err);
    }
  };

  const addCategories = async (title) => {
    try {
      const response = await axios.post("/api/categories", { title });
      setCategories((prevCategories) => [...prevCategories, response.data]);
    } catch (err) {
      console.error("Error al crear la categria", err);
    }
  };

  const getNoteById = (id) =>
    notes.find((note) => String(note.id) === String(id));

  const getDynamicCategories = () => {
    return categories.map((category) => ({
      ...category,
      notes: notes.filter(
        (note) => String(note.categoryId) === String(category.id),
      ),
    }));
  };

  if (!isMounted) return null;

  return (
    <NotesContext.Provider
      value={{
        notes,
        categories,
        addNote,
        updateNote,
        deleteNote,
        addCategories,
        getNoteById,
        getDynamicCategories,
      }}
    >
      {children}
    </NotesContext.Provider>
  );
}

export const useNotes = () => useContext(NotesContext);
