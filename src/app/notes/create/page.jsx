import React from 'react'
import Link from 'next/link'

function page() {
  return (
    <section className="flex p-20 items-center justify-center w-full">
      <form className="flex flex-col flex-1 p-6 rounded-lg bg-green-100 gap-4">
        <Link href="/notes" className="text-blue-500 hover:text-blue-700">
          Volver a las notas
        </Link>
        <input type="text" placeholder="Título" className='p-2 text-black'/>
        <textarea placeholder="Contenido" className='text-black'></textarea>
        <button type="submit" className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          Guardar
        </button>
      </form>
    </section>
  )
}

export default page
