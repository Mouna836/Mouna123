const sql = require('../db')
const bcrypt  = require('bcrypt')
const jwt = require('jsonwebtoken')

const  secret = 'jwt-secret-key'

exports.register = async (req, res) =>{
    try{
        console.log('data')
        const {userName, password, roleId} = req.body;
        const hashedPassword = await bcrypt.hash(password, 10)
        const data = await sql.query`Insert into users (userName, password,roleId) values(${userName}, ${hashedPassword}, ${roleId})`
        res.json('Registered successfully')
    }catch(err){
        res.status(500).send(err.message)
    }
}


exports.logIn = async (req, res)=>{
    try{
        const {userName, password} = req.body
        const userData = await sql.query`SELECT * from users where userName=${userName}`
        const user = userData.recordset[0];
        const role = await sql.query`SELECT * from Roles where roleId= ${user?.RoleId}`
        const roleName = role.recordset[0].RoleName
         if(user && await bcrypt.compare(password, user.Password) ) {
            const token = jwt.sign({userID: user.UserId, roleID: user.RoleId}, secret, {expiresIn: '2h'})
            res.json({token,roleName})
        }
        else{
            res.status(401).send("Invalid credentials")
        }
    }catch(err){
        res.status(500).send(err.message)
    }
}