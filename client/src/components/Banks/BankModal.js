import { useEffect, useState } from 'react'

export default function BankModal({ createBank, editingBank, editBank, closeModal }) {
  const [name, setName] = useState('')
  const [interestRate, setInterestRate] = useState(0)
  const [maximumLoan, setMaximumLoan] = useState(0)
  const [minimumDownPayment, setMinimumDownPayment] = useState(0)
  const [loanTerm, setLoanTerm] = useState(0)
  const [isEditing, setIsEditing] = useState(false)
  const [buttonText, setButtonText] = useState('Create')

  useEffect(() => {
    if (editingBank) {
      const { name, interestRate, maximumLoan, minimumDownPayment, loanTerm } = editingBank
      setIsEditing(true)
      setName(name)
      setInterestRate(interestRate)
      setMaximumLoan(maximumLoan)
      setMinimumDownPayment(minimumDownPayment)
      setLoanTerm(loanTerm)
      setButtonText('Update')
    }
  }, [editingBank])

  const onFormSubmit = (e) => {
    e.preventDefault()
    if (isEditing) {
      editBank(editingBank._id, { name, interestRate, maximumLoan, minimumDownPayment, loanTerm })
    } else {
      createBank({ name, interestRate, maximumLoan, minimumDownPayment, loanTerm })
    }
    closeModal()
  }

  return (
    <div className="modal">
      <form onSubmit={onFormSubmit} className="modal__content">
        <div className="form-group">
          <label>
            Bank name
            <input
              className="form-control"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </label>
        </div>
        <div className="form-group">
          <label>
            Interest rate
            <input
              className="form-control"
              type="number"
              value={interestRate}
              onChange={(e) => setInterestRate(e.target.value)}
              required
            />
          </label>
        </div>
        <div className="form-group">
          <label>
            Maximum loan
            <input
              className="form-control"
              type="number"
              value={maximumLoan}
              onChange={(e) => setMaximumLoan(e.target.value)}
              required
            />
          </label>
        </div>
        <div className="form-group">
          <label>
            Minimum down payment
            <input
              className="form-control"
              type="number"
              value={minimumDownPayment}
              onChange={(e) => setMinimumDownPayment(e.target.value)}
              required
            />
          </label>
        </div>
        <div className="form-group">
          <label>
            Loan term (in months)
            <input
              className="form-control"
              type="number"
              value={loanTerm}
              onChange={(e) => setLoanTerm(e.target.value)}
              required
            />
          </label>
        </div>
        <button type="submit" className="btn btn-primary">
          {buttonText}
        </button>
        <button onClick={closeModal} type="button" className="btn btn-light ml-3">
          Cancel
        </button>
      </form>
    </div>
  )
}
