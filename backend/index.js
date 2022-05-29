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


        //UserData, Use Role
        app.put('/usersdata', async (req, res) => {
            const userinfo = req.body
            let result;
            if (userinfo.type) {
                const filter = { email: userinfo.email }
                const updateRole = {
                    $set: {
                        role: 'admin'
                    }
                };
                result = await usersDataCollection.updateOne(filter, updateRole);

            } else {
                const filter = { email: userinfo.email }
                const options = { upsert: true };
                const userDoc = {
                    $set: userinfo
                };
                result = await usersDataCollection.updateOne(filter, userDoc, options);
            }
            res.send(result)
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