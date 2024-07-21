const sql = require('../db')


exports.getAllDepartments = async (req, res) =>{
    try{
        const result = await sql.query`SELECT * FROM Departments`;
        res.statusCode=200
        res.send(result.recordset)
    }catch(err){
        res.status(500).send(err.message)
    }
}

exports.addDepartment = async (req, res) => {
    console.log('data')
    try{
        const data = await sql.query`INSERT INTO Departments (DepartmentName) values(${req.body.departmentName})`;
        res.statusCode=200
        res.send('Department created')
    }catch(err){
        res.status(500).send(err.message)
    }

}