const sql = require('../db')

exports.getAllEmployees = async(req, res)=>{
    try{
        const response= await sql.query`select 
        emp.EmployeeId  as employeeId, 
        emp.FristName as firstName, 
        emp.LastName as lastName,
        emp.Email as email,
        dpt.DepartmentName as departmentName, 
        r.RoleName as roleName, 
        emp.DateofJoining  as dateOfJoining
        from Employees emp 
        inner join Departments dpt on dpt.departmentId=emp.DepartmentId
        inner join roles r on r.RoleId = emp.RoleId`
        console.log(response.recordset)
        res.statusCode=200
        res.send(response.recordset)
    }catch(err){
        res.status(500).send(err.message)
    }
}
exports.addEmployee = async (req, res) =>{
    const {firstName, lastName, email, departmentName,roleName,dateOfJoining} = req.body.newEmployee
    try{
        const departmentRecord = await sql.query`SELECT * FROM DEPARTMENTS WHERE DepartmentName =${departmentName}`
        const roleRecord = await sql.query`SELECT * FROM ROLES WHERE roleName = ${roleName}`
        console.log(departmentRecord.recordset, roleRecord.recordset)
        if(departmentRecord?.recordset?.length===0 || roleRecord?.recordset?.length === 0 ){ 
            res.statusCode=202
            res.send({error:'Check Department and Role names are exist in their respective sections'})
            return
        }
        const data = await sql.query`INSERT INTO EMPLOYEES (FristName,LastName, Email,DepartmentId, RoleId, DateOfJoining) values (${firstName},${lastName}, ${email}, ${departmentRecord?.recordset[0].DepartmentId}, ${roleRecord.recordset[0].RoleId},${dateOfJoining})`
        res.statusCode=200
        res.send({success:'New Employee added successfully'})
    }catch(err) {
        res.status(500).send(err.message)
    }
}


exports.editEmployee = async(req, res)=>{
    const {firstName, lastName, email, departmentName,roleName,dateOfJoining }= req.body.employee
    console.log(res.params, req.body.employee)
    try{
        const departmentRecord = await sql.query`SELECT * FROM DEPARTMENTS WHERE DepartmentName =${departmentName}`
        const roleRecord = await sql.query`SELECT * FROM ROLES WHERE roleName = ${roleName}`
        console.log(departmentRecord.recordset, roleRecord.recordset)
        if(departmentRecord?.recordset?.length===0 || roleRecord?.recordset?.length === 0 ){ 
            res.statusCode=202
            res.send({error:'Check Department and Role names are exist in their respective sections'})
            return
        }
        await sql.query`UPDATE EMPLOYEES SET FRISTNAME = ${firstName},LASTNAME=${lastName},Email=${email},DEPARTMENTId=${departmentRecord?.recordset[0].DepartmentId}, ROLEID=${roleRecord?.recordset[0]?.RoleId}, DATEOFJOINING=${dateOfJoining} WHERE EMPLOYEEID = ${req.params.employeeId}`
        res.statusCode=200
        res.send({success:'Updated Employee details Successfully'})

    }catch(err){
        console.log(err.message, 'Error while editing the Employee details')
    }
}
exports.deleteEmployee = async (req, res) =>{
    try{
        await sql.query`DELETE FROM PerformanceReviews  WHERE EMPLOYEEID = ${req?.params?.employeeId}`
        await sql.query`DELETE FROM EMPLOYEES WHERE EMPLOYEEID=${req?.params?.employeeId}`
        res.statusCode=200
        res.send({success:'Employee record deleted successfully'})
    }catch(err){
        res.status(500).send(err.message,'Error while deleting the employee details')
    }

}

