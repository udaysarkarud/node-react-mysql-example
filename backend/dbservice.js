import mysql from 'mysql';
import dotenv from 'dotenv';
dotenv.config();

//mysql Connection
const db = mysql.createConnection({
    host:`${process.env.MYSQL_HOST}`,
    user:`${process.env.MYSQ_USER}`,
    password:`${process.env.MYSQ_PASSWORD}`,
    database:`${process.env.MYSQ_DATABASE}`
});

db.connect((err)=>{
    if(err){
        throw err;
    }
    console.log('mysql connected')
})

export default db;