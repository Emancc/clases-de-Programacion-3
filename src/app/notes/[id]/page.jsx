import { getNoteById } from "@/lib/notes";
import React from "react";
import NoteDetail from "@/app/components/NoteDetail";

export default async function page({ params }) {
  const { id } = await params;
  const nota = getNoteById(id);

  return (
    <div className="flex flex-1 items-start gap-4 justify-center bg-zinc-50 font-sans dark:bg-black">
      <NoteDetail nota={nota} />
    </div>
  );
}
