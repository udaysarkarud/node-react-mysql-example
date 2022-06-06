import { playdb } from '../resdbquery.js';
const addNewSchool = (tableName, getdata, req, res) => {
    const today = new Date();
    const uid = 'SID' + today.getFullYear() + '' + (today.getMonth() + 1) + '' + today.getDate() + '' + today.getHours() + "" + today.getMinutes() + "" + today.getSeconds();

    const clientData = req.body;

    //sql script
    let sql = `INSERT INTO ${tableName} (${getdata.toString()}) VALUES ('${uid}', NOW(), NOW(), '${clientData.name}', '${clientData.about}', '${clientData.phone}', '${clientData.email}', '${clientData.address}', '${clientData.logo}')`;
    playdb(sql, res);
}


const editSchool = (tableName, req, res) => {
    let updateData = '';

    for (let p in req.body) {
        str += p + '=' + `'${req.body[p]}'` + ', ';
    }

    let sql = `UPDATE ${tableName} SET ${updateData} updated_on = NOW() WHERE code = '${req.params.uid}'`;
    
    playdb(sql, res);

}


/* const addNewSchool =(getdata) => async(req,res) => {
    const abcd = getdata;
    console.log(abcd)
    const today = new Date();
    const uid = 'SID' + today.getFullYear() + '' + (today.getMonth() + 1) + '' + today.getDate() + '' + today.getHours() + "" + today.getMinutes() + "" + today.getSeconds();

    const clientData = req.body;

    //sql script
    let sql = `INSERT INTO school (code, create_on, updated_on, name, about, phone, email, address, logo) VALUES ('${uid}', NOW(), NOW(), '${clientData.name}', '${clientData.about}', '${clientData.phone}', '${clientData.email}', '${clientData.address}', '${clientData.logo}')`;
    playdb(sql,res);
} */

export { addNewSchool, editSchool };