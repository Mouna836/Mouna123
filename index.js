const express = require('express')
const bodyParser =  require('body-parser')
const cors = require('cors')
const app = express()
const userRoutes = require('./src/routes/users')
const departmentRoute = require('./src/routes/departments')
const rolesRoute= require('./src/routes/roles')
const employeeRoute = require('./src/routes/employees')
const performanceRoute = require('./src/routes/performance')

app.use(bodyParser.json())
app.use(cors())

app.use('/users',userRoutes)
app.use('/employees',employeeRoute)
app.use('/departments', departmentRoute)
app.use('/roles', rolesRoute)
app.use('/performances', performanceRoute)
app.get('/',(req,res)=>{
    res.send('form initiated')

})
const PORT = process.env.PORT || 3000
app.listen(PORT, ()=>{
    console.log(`server is running ${PORT}`)
})