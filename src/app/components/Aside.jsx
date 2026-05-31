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
        <h2 className="text-xl font-semibold cursor-pointer">
          {category.title}
        </h2>
        <span className="ml-2 text-sm text-gray-500">{isOpen ? "▼" : "►"}</span>
      </button>
      <ul className={`mt-2 space-y-1 ${isOpen ? "block" : "hidden"}`}>
        {category.notes.map((subItem, index) => (
          <li
            key={index}
            className="pl-4 cursor-pointer transition-all duration-200 hover:scale-105"
          >
            <Link href={`/notes/${subItem.id}`}> {subItem.title} </Link>
          </li>
        ))}
      </ul>
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
      return { ...category, notes: [filteredNotes] };
    })
    .filter((category) => {
      category.notes.length > 0 ||
        category.title.toLowerCase().includes(searchQuery.toLowerCase());
    });

  return (
    <aside className="w-72 py-8 px-6 border-r border-zinc-700">
      <div>
        <h1 className="text-4xl font-bold">Notas</h1>
        <p>Todas nuestras notas</p>
      </div>

      <input
        type="text"
        placeholder="Buscar notas..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="bg-zinc-800 text-zinc-300 placeholder:text-zinc-500 border border-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <div className="space-y-6 mt-8">
        {filteredData.map((item, index) => (
          <div className="border-b pb-6 border-zinc-700" key={index}>
            <CategorySection category={item} />
          </div>
        ))}
      </div>
    </aside>
  );
}
