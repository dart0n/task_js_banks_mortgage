import { useEffect, useState } from 'react'

export default function MortgageCalculator({ banks }) {
  const [loan, setLoan] = useState(0)
  const [downPayment, setDownPayment] = useState(0)
  const [bank, setBank] = useState(null)
  const [errors, setErrors] = useState(null)
  const [monthlyMortgagePayment, setMonthlyMortgagePayment] = useState(null)

  useEffect(() => {
    if (!bank && banks) setBank(banks[0])
  }, [bank, banks, monthlyMortgagePayment, errors])

  const onFormSubmit = (e) => {
    e.preventDefault()

    if (loan > bank.maximumLoan || downPayment < bank.minimumDownPayment) {
      let errors = []
      if (loan > bank.maximumLoan) {
        errors = [...errors, `Maximum loan is ${bank.maximumLoan} for this bank`]
      }
      if (downPayment < bank.minimumDownPayment) {
        errors = [...errors, `Minimum down payment is ${bank.minimumDownPayment} for this bank`]
      }
      setErrors(errors)
      setMonthlyMortgagePayment(null)
    } else {
      const monthlyInterestRate = bank.interestRate / 12 / 100
      const totalRate = Math.pow(1 + monthlyInterestRate, bank.loanTerm)

      setMonthlyMortgagePayment(((loan - downPayment) * monthlyInterestRate * totalRate) / (totalRate - 1))
      setErrors(null)
    }
  }

  const changeBank = (e) => {
    setBank(banks.find((b) => b.name === e.target.value))
  }

  return (
    <div>
      <h2 className="mb-2">Mortgage Calculator</h2>

      <form onSubmit={onFormSubmit}>
        <div className="form-group">
          <label>
            Initial loan
            <input
              type="number"
              className="form-control"
              value={loan}
              onChange={(e) => setLoan(Number(e.target.value))}
              required
            />
          </label>
        </div>
        <div className="form-group">
          <label>
            Down payment
            <input
              type="number"
              className="form-control"
              value={downPayment}
              onChange={(e) => setDownPayment(Number(e.target.value))}
              required
            />
          </label>
        </div>
        <div className="form-group">
          <label>
            Bank
            <select onChange={changeBank} className="form-control">
              {banks?.map((bank) => (
                <option key={bank._id} value={bank.name}>
                  {bank.name}
                </option>
              ))}
            </select>
          </label>
        </div>
        <button type="submit" className="btn btn-primary">
          Calculate
        </button>
      </form>

      {errors && (
        <div className="text-danger mt-2">
          {errors.map((error, i) => (
            <p key={i}>{error}</p>
          ))}
        </div>
      )}

      {monthlyMortgagePayment && (
        <p className="mt-3">
          Calculated monthly mortgage payment: <strong>{monthlyMortgagePayment.toFixed(2)}</strong>
        </p>
      )}
    </div>
  )
}
