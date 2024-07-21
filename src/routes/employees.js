const express = require('express')
const router = express.Router()
const {getAllEmployees, addEmployee, editEmployee, deleteEmployee} = require('../controllers/employees')
const auth= require('../middleware/auth')
const roles = require('../middleware/roles')

router.get('/',auth,getAllEmployees)
router.post('/', auth, roles(['HR Manager']),addEmployee)
router.put('/:employeeId',auth,roles(['HR Manager']),editEmployee)
router.delete('/:employeeId',auth,deleteEmployee)

module.exports = router