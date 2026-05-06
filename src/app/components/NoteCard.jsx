import Link from "next/link";
export default function NoteCard({ note, key }) {
  return (
    <section
      key={key}
      className="w-full h-64 my-8 rounded-lg bg-zinc-800 text-white p-6 justify-between flex flex-col"
    >
      <div>
        <h1 className="font-semibold">{note.title}</h1>
        <p className="text-sm">{note.content.slice(0, 100)}...</p>
      </div>
      <Link
        href={`/notes/${note.id}`}
        className="text-blue-500 hover:text-blue-700"
      >
        Ver Nota
      </Link>
    </section>
  );
}
