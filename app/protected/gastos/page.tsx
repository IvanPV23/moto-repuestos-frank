import GastoTable from '@/components/gastos/gasto-table'

export default function GastosPage() {
  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Gestión de Gastos</h1>
      <GastoTable />
    </div>
  )
}