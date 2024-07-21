const sql = require('../db')


exports.getAllRoles = async (req,res)=>{
    try{
        const data = await sql.query`SELECT * FROM ROLES`
        res.statusCode=200
        res.send(data.recordset);
    }catch(err){
        res.status(500).send(err.message)
    }
}

exports.addRole = async(req,res)=> {
    try{
        await sql.query`INSERT into roles (RoleName) values(${req.body.roleName})`
        res.status(200).send('Role name inserted ')
    }catch(err){
        res.status(500).send(err.message)
    }
}