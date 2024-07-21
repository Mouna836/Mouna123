const express = require('express')
const route = express.Router()
const {getAllPerformance,addNewPerformance }= require('../controllers/performance')
const auth= require('../middleware/auth')
const roles = require('../middleware/roles')

route.get('/',auth,getAllPerformance)
route.post('/',auth, roles(['HR Manager']),addNewPerformance )

module.exports=route