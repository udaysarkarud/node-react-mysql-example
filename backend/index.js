const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
require('dotenv').config();
const app = express();


const port = process.env.PORT || 5000;


//midelware
app.use(cors());
app.use(express.json());

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


const main = async () => {
    try {

        app.get('/setupdb', async(req,res)=>{
            let createDB = 'CREATE DATABASE schoolmngsys'
            db.query(createDB, (err, result)=>{
                if(err){
                    console.log(err)
                }
            })

            let createtable = `CREATE TABLE school(
                id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
                code VARCHAR(45) UNIQUE NOT NULL,
                create_on DATETIME NOT NULL,
                updated_on DATETIME,
                delete_on DATETIME,
                name VARCHAR(150) NOT NULL,
                about VARCHAR(1000) NOT NULL,
                phone VARCHAR(20) NOT NULL,
                email VARCHAR(40) NOT NULL,
                address VARCHAR(200) NOT NULL,
                logo VARCHAR(200) NOT NULL)`;

            db.query(createtable, (err, result)=>{
                if(err){
                    console.log(err)
                }
                res.send(result)
            })
        })

        //add new school
        app.post('/school', async(req,res)=>{
            //uid
            const today = new Date();
            const uid = 'SID'+today.getFullYear()+''+(today.getMonth()+1)+''+today.getDate()+''+today.getHours() + "" + today.getMinutes() + "" + today.getSeconds();

            //get data from client side
            const clientData = req.body;
            
            //sql script
            let sql = `INSERT INTO school (code, create_on, updated_on, name, about, phone, email, address, logo) VALUES ('${uid}', NOW(), NOW(), '${clientData.name}', '${clientData.about}', '${clientData.phone}', '${clientData.email}', '${clientData.address}', '${clientData.logo}')`;

            db.query(sql, (err, result)=>{
                if(err){
                    console.log(err)
                }
                res.send(result)
            })
        })

        //get all schools
        app.get('/school', async(req,res)=>{
                        
            //sql script
            let sql = `SELECT * FROM school WHERE delete_on IS NULL`;

            db.query(sql, (err, result)=>{
                if(err){
                    console.log(err)
                }
                res.send(result)
            })
        })

        //get all schools
        app.get('/getoneschool/:uid', async(req,res)=>{
                        
            //sql script
            let sql = `SELECT * FROM school WHERE code = '${req.params.uid}'`;

            db.query(sql, (err, result)=>{
                if(err){
                    console.log(err)
                }
                res.send(result)
            })
        })

        //update school info
        app.put('/school/:uid', async(req,res)=>{

            //sql script
            let sql = `UPDATE school SET name = '${req.body.name}', about = '${req.body.about}', phone = '${req.body.phone}', email = '${req.body.email}', address = '${req.body.address}', updated_on = NOW() WHERE code = '${req.params.uid}'`;

            db.query(sql, (err, result)=>{
                if(err){
                    console.log(err)
                }
                res.send(result)
            })
        })

        //fake delete school info
        app.put('/deleteschool/:uid', async(req,res)=>{
                        
            //sql script
            let sql = `UPDATE school SET delete_on = NOW() WHERE code = '${req.params.uid}'`;

            db.query(sql, (err, result)=>{
                if(err){
                    console.log(err)
                }
                res.send(result)
            })
        })

        //delete school
        app.delete('/school/:uid', async(req,res)=>{

            let sql = `DELETE FROM school WHERE code = '${req.params.uid}'`;

            db.query(sql, (err, result)=>{
                if(err){
                    console.log(err)
                }
                res.send(result)
            })
        })
        
    }

    finally {

    }
}

main().catch(console.dir)

app.get('/', (req, res) => {
    res.send('Hello from backend')
})

app.listen(port, () => {
    console.log(`listening Port:${port}`)
})