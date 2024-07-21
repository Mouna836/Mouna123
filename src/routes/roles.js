const express = require('express')
const router = express.Router()
const {getAllRoles, addRole} = require('../controllers/roles')
const auth= require('../middleware/auth')
const roles = require('../middleware/roles')

router.get('/',auth,getAllRoles)
router.post('/post',auth,roles(['HR Manager']), addRole)

module.exports= router

