import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { createOrUpdateCurrentUser } from "@/lib/currentUser";

export async function PUT(request, { params }) {
  try {
    const user = await createOrUpdateCurrentUser();
    if (!user) return NextResponse.json({ error: "no auth" }, { status: 401 });

    const { id } = await params;
    const { title } = await request.json();

    const updatedCategory = await db.category.update({
      where: { id: parseInt(id, 10), userId: user.id },
      data: { title },
    });
    return NextResponse.json(updatedCategory, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Error en el put de categories" },
      { status: 500 },
    );
  }
}

export async function DELETE(request, { params }) {
  try {
    const user = await createOrUpdateCurrentUser();
    if (!user) return NextResponse.json({ error: "no auth" }, { status: 401 });

    const { id } = await params;
    await db.category.delete({
      where: { id: parseInt(id, 10), userId: user.id },
    });
    return NextResponse.json({ message: "Categoria borrada" }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Error en el delete de categories" },
      { status: 500 },
    );
  }
}
