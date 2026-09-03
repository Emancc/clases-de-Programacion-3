import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { createOrUpdateCurrentUser } from "@/lib/currentUser";

export async function PUT(request, { params }) {
  try {
    const user = await createOrUpdateCurrentUser();
    if (!user) {
      return NextResponse.json({ error: "no auth" }, { status: 401 });
    }
    const { id } = await params;
    const data = await request.json();

    const updatedData = {};

    if (data.title !== undefined) {
      updatedData.title = data.title;
    }
    if (data.content !== undefined) {
      updatedData.content = data.content;
    }
    if (data.ejemplo !== undefined) {
      updatedData.ejemplo = data.ejemplo;
    }

    const rawCategoryId = data.categoryId;
    if (rawCategoryId !== undefined && rawCategoryId !== null) {
      const parsedCategoryId = parseInt(rawCategoryId, 10);
      if (!isNaN(parsedCategoryId)) {
        updatedData.categoryId = parsedCategoryId;
      }
    }

    const updatedNote = await db.note.update({
      where: { id: parseInt(id, 10), userId: user.id },
      data: updatedData,
      include: { category: true },
    });

    return NextResponse.json(updatedNote, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Error en el put de notes" },
      { status: 500 },
    );
  }
}

export async function DELETE(request, { params }) {
  try {
    const user = await createOrUpdateCurrentUser();
    if (!user) {
      return NextResponse.json({ error: "no auth" }, { status: 401 });
    }

    const { id } = await params;
    await db.note.delete({ where: { id: parseInt(id) }, userId: user.id });
    return NextResponse.json({ message: "Note deleted" }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Error en el delete de notes" },
      { status: 500 },
    );
  }
}
