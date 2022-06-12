import playdb from '../resdbquery.js';

const getAllData = (tableName='', req, res) => {
    let sql = `SELECT * FROM ${tableName} WHERE delete_on IS NULL`;
    playdb(sql, res);
}


export default getAllData;