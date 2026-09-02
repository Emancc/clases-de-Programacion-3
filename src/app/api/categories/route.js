import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET() {
  try {
    const categories = await db.category.findMany();
    return NextResponse.json(categories);
  } catch (error) {
    return NextResponse.json(
      { error: "Error en el get de categories" },
      { status: 500 },
    );
  }
}

export async function POST(request) {
  try {
    const { title } = await request.json();
    const newCategory = await db.category.create({
      data: { title },
    });
    return NextResponse.json(newCategory, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "error en el post de categories" },
      { status: 500 },
    );
  }
}
