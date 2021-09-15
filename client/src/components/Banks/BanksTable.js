export default function BanksTable({ banks, setEditingBank, deleteBank }) {
  return (
    <table className="table">
      <thead>
        <tr>
          <td>Name</td>
          <td>Interest rate</td>
          <td>Maximum loan</td>
          <td>Minimum down payment</td>
          <td>Loan term</td>
          <td>Actions</td>
        </tr>
      </thead>
      <tbody>
        {banks.map((bank) => (
          <tr key={bank._id}>
            <td>{bank.name}</td>
            <td>{bank.interestRate}</td>
            <td>{bank.maximumLoan}</td>
            <td>{bank.minimumDownPayment}</td>
            <td>{bank.loanTerm}</td>
            <td>
              <button onClick={() => setEditingBank(bank)} className="btn btn-outline-warning btn-sm">
                Edit
              </button>
              <button onClick={() => deleteBank(bank)} className="btn btn-outline-danger btn-sm">
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
