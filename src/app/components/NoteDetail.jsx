export default function NoteDetail({ nota }) {
  return (
    <main className="flex flex-1 w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
      <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
        <h1 className="max-w-xs text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50 mb-4">
          {nota.title}
        </h1>
      </div>
      <p className="text-justify">{nota.content}</p>
      <section className="w-full min-h-64 my-8 p-4 rounded-lg flex flex-col bg-zinc-800 text-violet-400 justify-between">
        <p className="text-lg text-white py-4">Ejemplo:</p>
        <pre className="bg-zinc-900 p-6 justify-between rounded">
          <code>{nota.ejemplo}</code>
        </pre>
      </section>
    </main>
  );
}
