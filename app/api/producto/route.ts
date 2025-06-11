import { NextResponse } from "next/server";
import { PrismaClient } from '@/lib/generated/prisma';

const prisma = new PrismaClient()

export async function POST(req: Request) {
  const body = await req.json()

  try {
    const nuevoCliente = await prisma.cliente.create({
      data: {
        nombre: body.nombre,
        edad: body.edad,
        tipo_cliente: body.tipo_cliente,
        telefono: body.telefono,
      },
    })

    return NextResponse.json(nuevoCliente)
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Error al crear cliente' }, { status: 500 })
  }
}