import ClienteForm from '@/components/clientes/cliente-form'

export default function ClientePage() {
  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Registrar Cliente</h1>
      <ClienteForm />
    </div>
  )
}
