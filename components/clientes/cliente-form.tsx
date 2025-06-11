'use client'

import { useState } from 'react'

export default function ClienteForm() {
  const [nombre, setNombre] = useState('')
  const [tipoCliente, setTipoCliente] = useState('Regular')
  const [edad, setEdad] = useState('')
  const [telefono, setTelefono] = useState('')
  const [mensaje, setMensaje] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const res = await fetch('/api/clientes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        nombre,
        tipo_cliente: tipoCliente,
        edad: edad ? parseInt(edad) : null,
        telefono: telefono || null,
      }),
    })

    if (res.ok) {
      setMensaje('Cliente registrado correctamente')
      setNombre('')
      setEdad('')
      setTelefono('')
      setTipoCliente('Regular')
    } else {
      setMensaje('Error al registrar cliente')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block font-medium">Nombre</label>
        <input
          type="text"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          className="border px-2 py-1 w-full"
          required
        />
      </div>

      <div>
        <label className="block font-medium">Tipo de cliente</label>
        <select
          value={tipoCliente}
          onChange={(e) => setTipoCliente(e.target.value)}
          className="border px-2 py-1 w-full"
        >
          <option value="Regular">Regular</option>
          <option value="VIP">VIP</option>
        </select>
      </div>

      <div>
        <label className="block font-medium">Edad (opcional)</label>
        <input
          type="number"
          value={edad}
          onChange={(e) => setEdad(e.target.value)}
          className="border px-2 py-1 w-full"
        />
      </div>

      <div>
        <label className="block font-medium">Teléfono (opcional)</label>
        <input
          type="text"
          value={telefono}
          onChange={(e) => setTelefono(e.target.value)}
          className="border px-2 py-1 w-full"
        />
      </div>

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Registrar Cliente
      </button>

      {mensaje && <p className="text-green-600">{mensaje}</p>}
    </form>
  )
}
