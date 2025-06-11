"use client"

import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

interface Props {
  onSuccess: () => void
  onCancel: () => void
}

export default function GastoForm({ onSuccess, onCancel }: Props) {
  const [tipo, setTipo] = useState('Alquiler')
  const [monto, setMonto] = useState('')
  const [fecha, setFecha] = useState('')
  const [descripcion, setDescripcion] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    const res = await fetch('/api/gasto', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        tipo,
        monto: parseFloat(monto),
        fecha,
        descripcion: descripcion || null,
      }),
    })

    setLoading(false)

    if (res.ok) {
      onSuccess()
    } else {
      alert('Error al registrar gasto')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 border p-4 bg-white shadow rounded">
      <div>
        <label className="block font-medium">Tipo</label>
        <select
          value={tipo}
          onChange={(e) => setTipo(e.target.value)}
          className="border px-2 py-1 w-full"
        >
          <option value="Alquiler">Alquiler</option>
          <option value="Luz/Agua">Luz/Agua</option>
          <option value="Repuestos">Repuestos</option>
          <option value="Pago a mecánicos">Pago a mecánicos</option>
          <option value="Otro">Otro</option>
        </select>
      </div>

      <div>
        <label className="block font-medium">Monto</label>
        <Input
          type="number"
          value={monto}
          onChange={(e) => setMonto(e.target.value)}
          required
        />
      </div>

      <div>
        <label className="block font-medium">Fecha</label>
        <Input
          type="date"
          value={fecha}
          onChange={(e) => setFecha(e.target.value)}
          required
        />
      </div>

      <div>
        <label className="block font-medium">Descripción (opcional)</label>
        <textarea
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
          className="border w-full px-2 py-1"
          rows={2}
        />
      </div>

      <div className="flex gap-2 justify-end">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancelar
        </Button>
        <Button type="submit" disabled={loading}>
          {loading ? 'Guardando...' : 'Guardar'}
        </Button>
      </div>
    </form>
  )
}
