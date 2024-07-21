const express = require('express')
const router = express.Router()
const {getAllDepartments,addDepartment} = require('../controllers/departments')
const auth= require('../middleware/auth')
const roles = require('../middleware/roles')

router.get('/',auth, getAllDepartments)
router.post('/post',auth, roles(['HR Manager']),addDepartment)
// router.put('/', editDepartmentName)
// router.delete('/', removeDepartment)


module.exports = router