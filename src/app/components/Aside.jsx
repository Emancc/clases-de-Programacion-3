"use client";
import { useState, useEffect } from "react";
import { useNotes } from "../notes/NotesContext";
import Link from "next/link";

function CategorySection({ category }) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center cursor-pointer"
      >
        <h2 className="text-xl font-semibold cursor-pointer hover:text-zinc-500 transition-colors">
          {category.title}
        </h2>
        <span className="ml-2 text-sm text-gray-500">{isOpen ? "▼" : "►"}</span>
      </button>
      <div
        className={`grid transition-all duration-300 ease-in-out ${isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
      >
        <ul className="overflow-hidden text-sm text-gray-500">
          {category.notes.map((subItem, index) => (
            <li
              key={index}
              className="pl-4 cursor-pointer transition-all duration-200 hover:scale-105"
            >
              <Link href={`/notes/${subItem.id}`}> {subItem.title} </Link>
            </li>
          ))}
          {category.notes.length === 0 && (
            <li className="pl-4 text-sm text-gray-500 italic">No hay notas</li>
          )}
        </ul>
      </div>
    </div>
  );
}

export default function Aside({ data }) {
  const { addCategories } = useNotes();
  const [newCat, setNewCat] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const handleAddCategory = (e) => {
    e.preventDefault();
    if (!newCat.trim()) return;
    addCategories(newCat);
  };

  const filteredData = data
    .map((category) => {
      const filteredNotes = category.notes.filter(
        (note) =>
          note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          note.content.toLowerCase().includes(searchQuery.toLowerCase()),
      );
      return { ...category, notes: filteredNotes };
    })
    .filter(
      (category) =>
        category.notes.length > 0 ||
        category.title.toLowerCase().includes(searchQuery.toLowerCase()),
    );

  return (
    <aside className="w-72 py-8 px-6 border-r border-zinc-700">
      <div>
        <h1 className="text-4xl font-bold">Notas</h1>
        <p>Todas nuestras notas</p>
      </div>
      <div className="flex items-center gap-2 mt-6 bg-zinc-800 p-2 rounded">
        <svg
          width="20"
          height="20"
          fill="currentColor"
          className="bi bi-search"
          viewBox="0 0 16 16"
        >
          <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
        </svg>

        <input
          type="text"
          placeholder="Buscar notas..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="bg-zinc-800 text-zinc-300 placeholder:text-zinc-500 border border-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-500 p-2 rounded w-full"
        />
      </div>

      <div className="space-y-6 mt-8">
        {filteredData.map((item, index) => (
          <div className="border-b pb-6 border-zinc-700" key={index}>
            <CategorySection category={item} />
          </div>
        ))}
      </div>

      <form onSubmit={handleAddCategory}>
        <label className="block text-sm font-medium text-gray-300 mt-8">
          Agregar nueva categoría
        </label>
        <div className="flex gap-2 items-center mt-2 justify-center">
          <input
            type="text"
            placeholder="Nueva categoría"
            value={newCat}
            onChange={(e) => setNewCat(e.target.value)}
            className="bg-zinc-800 text-zinc-300 placeholder:text-zinc-500 border border-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full p-2 rounded"
          />
          <button
            type="submit"
            className="bg-green-700 text-white py-2 px-4 rounded hover:bg-green-600 transition-colors"
          >
            +
          </button>
        </div>
      </form>
    </aside>
  );
}
