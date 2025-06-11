import { NextResponse } from 'next/server'
import { PrismaClient } from '@/lib/generated/prisma'

const prisma = new PrismaClient()

export async function POST(req: Request) {
  try {
    const { nombre, tipo_cliente, edad, telefono } = await req.json()

    const nuevoCliente = await prisma.cliente.create({
      data: {
        nombre,
        tipo_cliente,
        edad,
        telefono,
      },
    })

    return NextResponse.json(nuevoCliente, { status: 201 })
  } catch (error) {
    console.error('Error al registrar cliente:', error)
    return NextResponse.json({ error: 'Error interno' }, { status: 500 })
  }
}
