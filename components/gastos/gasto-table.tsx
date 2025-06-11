"use client"

import { useEffect, useState } from "react"
import { format } from 'date-fns'
import { Input } from '@/components/ui/input'
import {Button} from '@/components/ui/button'

interface Gasto {
    id_gasto: string
    tipo: string
    monto: number
    fecha: string
    description?: string
}

export default function GastoTable(){
    const[gastos, setGastos] = useState<Gasto[]>([])
    const[filtroFecha, setFiltroFecha] = useState('')

    const fetchGastos = async() => {
        try {
            const res = await fetch('/api/gasto')
            const data = await res.json()
            setGastos(data)
        }catch(err){
            console.error('Error al cargar los gastos')
        }
    }

    useEffect(() => {
        fetchGastos()
    }, [])

    const gastosFiltrados = filtroFecha
        ? gastos.filter((g) => 
            g.fecha.startsWith(filtroFecha)
        )
        : gastos

    return (
        <div className="space-y-4">
        <div className="flex items-center justify-between gap-4">
            <Input
            type="date"
            value={filtroFecha}
            onChange={(e) => setFiltroFecha(e.target.value)}
            className="w-1/3"
            placeholder="Filtrar por fecha"
            />
            <Button
            className="bg-green-600 hover:bg-green-700"
            onClick={() => alert('Abrir formulario de nuevo gasto')}
            >
            + Nuevo Gasto
            </Button>
        </div>

        <table className="w-full border mt-4">
            <thead className="bg-gray-100">
            <tr>
                <th className="text-left p-2 border">ID</th>
                <th className="text-left p-2 border">Tipo</th>
                <th className="text-left p-2 border">Monto</th>
                <th className="text-left p-2 border">Fecha</th>
                <th className="text-left p-2 border">Acciones</th>
            </tr>
            </thead>
            <tbody>
            {gastosFiltrados.map((gasto) => (
                <tr key={gasto.id_gasto}>
                <td className="p-2 border">{gasto.id_gasto.slice(0, 8)}…</td>
                <td className="p-2 border">{gasto.tipo}</td>
                <td className="p-2 border">S/ {gasto.monto.toFixed(2)}</td>
                <td className="p-2 border">{format(new Date(gasto.fecha), 'yyyy-MM-dd')}</td>
                <td className="p-2 border space-x-2">
                    <Button size="sm" onClick={() => alert('Ver ' + gasto.id_gasto)}>👁️</Button>
                    <Button size="sm" onClick={() => alert('Editar ' + gasto.id_gasto)}>✏️</Button>
                    <Button size="sm" variant="destructive" onClick={() => alert('Eliminar ' + gasto.id_gasto)}>🗑️</Button>
                </td>
                </tr>
            ))}
            </tbody>
        </table>

        {gastosFiltrados.length === 0 && (
            <p className="text-center text-gray-500">No hay gastos registrados.</p>
        )}
        </div>
    )
}