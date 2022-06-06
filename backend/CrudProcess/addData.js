import { playdb } from '../resdbquery.js';

const addNewData = (tableName, getdata, req, res) => {
    const today = new Date();
    const uid = 'SID' + today.getFullYear() + '' + (today.getMonth() + 1) + '' + today.getDate() + '' + today.getHours() + "" + today.getMinutes() + "" + today.getSeconds();

    const clientData = req.body;

    //sql script
    let sql = `INSERT INTO ${tableName} (${getdata.toString()}) VALUES ('${uid}', NOW(), NOW(), '${clientData.name}', '${clientData.about}', '${clientData.phone}', '${clientData.email}', '${clientData.address}', '${clientData.logo}')`;
    
    playdb(sql, res);
}


export {addNewData};