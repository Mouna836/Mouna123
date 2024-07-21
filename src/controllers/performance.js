const sql = require('../db')


exports.getAllPerformance = async (req, res) =>{
    try{
        const result = await sql.query`select 
                    pr.ReviewId,
                    CONCAT(emp.FristName ,emp.LastName) as EmployeeName,
                    pr.ReviewDate,
                    pr.Reviewer,
                    pr.Comments
                    from PerformanceReviews pr 
                    inner join Employees emp on emp.EmployeeId = pr.EmployeeId`;
        res.statusCode=200
        res.send(result.recordset)
    }catch(err){
        res.status(500).send(err.message)
    }
}

exports.addNewPerformance = async (req, res) => {
    const {employeeId, reviewDate, reviewer, comments}=req.body
    console.log('data')
    try{
        const data = await sql.query`INSERT INTO PerformanceReviews (EmployeeId,ReviewDate,Reviewer,Comments) values(${employeeId}, ${reviewDate},${reviewer},${comments})`;
        res.statusCode=200
        res.send('Added performance successfully')
    }catch(err){
        res.status(500).send(err.message)
    }

}