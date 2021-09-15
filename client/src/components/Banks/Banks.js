import { useEffect, useState } from 'react'
import BankModal from './BankModal'
import BanksTable from './BanksTable'

export default function Banks({ banks, createBank, editBank, deleteBank }) {
  const [showModal, setShowModal] = useState(false)
  const [editingBank, setEditingBank] = useState(null)

  useEffect(() => {
    if (editingBank) {
      setShowModal(true)
    }
  }, [editingBank])

  const closeModal = () => {
    setShowModal(false)
    setEditingBank(null)
  }

  return (
    <div>
      <button onClick={() => setShowModal(true)} className="btn btn-outline-primary btn-sm mb-2">
        Create bank
      </button>

      {showModal && (
        <BankModal createBank={createBank} editingBank={editingBank} editBank={editBank} closeModal={closeModal} />
      )}

      {banks && <BanksTable banks={banks} setEditingBank={setEditingBank} deleteBank={deleteBank} />}
    </div>
  )
}
