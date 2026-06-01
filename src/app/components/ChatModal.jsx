"use client";

import { useState } from "react";
import { useNotes } from "@/app/notes/NotesContext";
import axios from "axios";
import ReactMarkdown from "react-markdown";

export default function ChatModal({ isOpen, onClose }) {
  const { notes } = useNotes();
  const [input, setInput] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, role: "assistant", text: "Hola, ¿en qué puedo ayudarte?" },
  ]);

  const handleSendMessage = async (e) => {
    e.preventDefault();

    if (!input.trim() || loading) return;
    const userMessage = {
      id: crypto.randomUUID(),
      role: "user",
      text: input.trim(),
    };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post("/api/ai", {
        notes: notes,
        messages: [...messages, userMessage],
      });

      setMessages((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          role: "assistant",
          text: response.data.result,
        },
      ]);
    } catch (err) {
      setError(
        err.response?.data?.error ||
          "Error desconocido no sabemos que hace la IA",
      );
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="w-full max-w-xl bg-zinc-900 border-zinc-500 rounded-lg p-4 flex flex-col gap-4 h-125">
        <div className="flex justify-between items-center border-b border-zinc-500 pb-2 mb-2">
          <span className="text-sm font-semibold">Itec Chat</span>
          <button
            className="bg-zinc-700 px-3 py-1 rounded hover:bg-zinc-800 cursor-pointer text-sm"
            onClick={onClose}
          >
            CERRAR!!
          </button>
        </div>

        <div className="flex-1 overflow-y-auto space-y-3">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`p-3 rounded max-w-xs ${msg.role === "user" ? "bg-gray-700 text-white ml-auto" : "bg-purple-700 text-white"}`}
            >
              <p className="block text-sm text-zinc-400 mb-1">
                {msg.role === "user" ? "Tú: " : "Asistente: "}
              </p>
              <ReactMarkdown>{msg.text}</ReactMarkdown>
            </div>
          ))}
          {loading && (
            <div className="p-3 rounded max-w-xs bg-gray-700 text-white ml-auto">
              <p className="block text-sm text-zinc-400 mb-1">cargando...</p>
            </div>
          )}
          {error && (
            <div className="p-3 rounded max-w-xs bg-red-500 text-white ml-auto">
              <p className="block text-sm text-zinc-400 mb-1">Error: {error}</p>
            </div>
          )}
        </div>

        <form
          onSubmit={handleSendMessage}
          className="flex items-center border-t border-zinc-500 pt-2"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={loading}
            placeholder="Escribe tu mensaje..."
            className="flex-1 bg-zinc-700 text-white placeholder:text-zinc-500 border border-zinc-500 rounded py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            disabled={loading || !input.trim()}
            className="ml-2 bg-purple-700 text-white px-4 py-2 rounded hover:bg-purple-800"
          >
            Enviar
          </button>
        </form>
      </div>
    </div>
  );
}
