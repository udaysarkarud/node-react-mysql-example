import express from 'express';
import db from './dbservice.js';
import { v4 as uuidv4 } from 'uuid';
import addNewData from './CrudProcess/addData.js';
import getAllData from './CrudProcess/getAllData.js';
import editData from './CrudProcess/editData.js';
import deleteData from './CrudProcess/deleteData.js';

import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();
const app = express();
const port = process.env.PORT || 5000;


//midelware
app.use(cors());
app.use(express.json());



// insert Data
const addToDB = (get) => {
    //sql script
    return `SELECT * FROM school WHERE delete_on IS NULL`;
}



const main = async () => {
    try {

        app.get('/setupdb', async (req, res) => {
            let createDB = 'CREATE DATABASE schoolmngsys'
            db.query(createDB, (err, result) => {
                if (err) {
                    console.log(err)
                }
            })

            let createtable = `CREATE TABLE school(
                uuid VARCHAR(45) PRIMARY KEY NOT NULL,
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

            db.query(createtable, (err, result) => {
                if (err) {
                    console.log(err)
                }
                res.send(result)
            })
        })

        //get all schools
        app.post('/school', async (req, res) => {

            const today = new Date();
            const code = 'SID' + today.getFullYear() + '' + (today.getMonth() + 1) + '' + today.getDate() + '' + today.getHours() + "" + today.getMinutes() + "" + today.getSeconds();

            const userData = {
                uuid: uuidv4(),
                code: code,
                create_on: new Date().toISOString().slice(0, 19).replace('T', ' '),
                updated_on: new Date().toISOString().slice(0, 19).replace('T', ' '),
                name: req.body.name,
                about: req.body.about,
                phone: req.body.phone,
                email: req.body.email,
                address: req.body.address,
                logo: req.body.logo
            }
            
            addNewData('school', userData, res)
        })

        //get all schools
        app.get('/school', async (req, res) => {
            getAllData('school', req, res);
        })

        //get all schools
        app.get('/getoneschool/:uid', async (req, res) => {

            //sql script
            let sql = `SELECT * FROM school WHERE code = '${req.params.uid}'`;

            db.query(sql, (err, result) => {
                if (err) {
                    console.log(err)
                }
                res.send(result)
            })
        })

        //update school info
        app.put('/school/:uid', async (req, res) => {
            editData('school', req, res);
        })

        //fake delete school info
        app.put('/deleteschool/:uid', async (req, res) => {
            deleteData('school', req, res);
        })

        //delete school
        app.delete('/school/:uid', async (req, res) => {
            pureDelete('school', req, res)
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