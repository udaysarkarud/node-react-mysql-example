import playdb from '../resdbquery.js';

const addNewData = (tableName, userData, res) => {

    //sql script
    let sql = `INSERT INTO ${tableName} (${Object.keys(userData).toString()}) VALUES (${"'"+ Object.values(userData).join("','")+"'"})`;

    
    playdb(sql,res)
}


export default addNewData;