const Router = require('express')
const BanksController = require('../controllers/BanksController')

const router = new Router()

router.get('/', BanksController.index)
router.post('/', BanksController.create)
router.put('/:id', BanksController.edit)
router.delete('/:id', BanksController.delete)

module.exports = router
