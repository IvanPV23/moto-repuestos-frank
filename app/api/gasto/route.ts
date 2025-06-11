import { NextResponse } from 'next/server'
import { PrismaClient } from '@/lib/generated/prisma'

const prisma = new PrismaClient()

export async function GET() {
  try {
    const gastos = await prisma.gasto.findMany({
      orderBy: { fecha: 'desc' },
    })
    return NextResponse.json(gastos)
  } catch (error) {
    console.error('Error al obtener gastos:', error)
    return NextResponse.json({ error: 'Error interno' }, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json()

    const nuevoGasto = await prisma.gasto.create({
      data: {
        tipo: body.tipo,
        monto: body.monto,
        fecha: new Date(body.fecha),
        descripcion: body.descripcion,
      },
    })

    return NextResponse.json(nuevoGasto, { status: 201 })
  } catch (error) {
    console.error('Error al registrar gasto:', error)
    return NextResponse.json({ error: 'Error interno' }, { status: 500 })
  }
}
