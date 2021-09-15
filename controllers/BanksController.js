const Bank = require('../models/Bank')

class BanksController {
  async index(req, res) {
    try {
      const banks = await Bank.find()
      res.json({ data: banks })
    } catch (e) {
      res.status(503).json({ error: 'Something went wrong, try again' })
    }
  }

  async create(req, res) {
    try {
      const { name, interestRate, maximumLoan, minimumDownPayment, loanTerm } = req.body

      const bankExists = await Bank.findOne({ name })
      if (bankExists) {
        return res.json({ data: bankExists })
      }

      const bank = new Bank({ name, interestRate, maximumLoan, minimumDownPayment, loanTerm })

      await bank.save()
      res.status(201).json({ data: bank })
    } catch (e) {
      res.status(422).json({ error: 'Invalid data' })
    }
  }

  async edit(req, res) {
    try {
      const bank = await Bank.findByIdAndUpdate({ _id: req.params.id }, req.body, { new: true })
      res.json({ data: bank })
    } catch (e) {
      res.status(404).json({ error: 'Not found' })
    }
  }

  async delete(req, res) {
    try {
      await Bank.findByIdAndDelete({ _id: req.params.id })
      res.status(204).send()
    } catch (e) {
      res.status(404).json({ error: 'Not found' })
    }
  }
}

module.exports = new BanksController()
