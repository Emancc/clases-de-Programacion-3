import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET() {
  try {
    const notes = await db.note.findMany({
      include: { category: true },
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(notes);
  } catch (error) {
    return NextResponse.json(
      { error: "Error en el get de notes" },
      { status: 500 },
    );
  }
}

export async function POST(request) {
  try {
    const data = await request.json();
    const categoryId = parseInt(data.categoryId);
    if (!data.title || !data.content || isNaN(categoryId)) {
      return NextResponse.json(
        {
          error:
            "ingresar un titulo, contenido y categoryId debe ser un numero",
        },
        { status: 400 },
      );
    }
    const newNote = await db.note.create({
      data: {
        title: data.title,
        content: data.content,
        ejemplo: data.ejemplo,
        categoryId: categoryId,
      },
      include: { category: true },
    });

    return NextResponse.json(newNote, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "error en el post de notes" },
      { status: 500 },
    );
  }
}
