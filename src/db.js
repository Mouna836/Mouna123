const sql = require('mssql')

const config = {
    user:'sa',
    password:'YourStrong!Passw0rd',
    server:'localhost',
    database:'HRMS',
    options:{
        encrypt: true,
        trustServerCertificate: true
    }
};

sql.connect(config).catch(err =>{
    console.error('Database connection Failed', err)
})


module.exports =sql;