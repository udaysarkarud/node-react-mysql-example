import playdb from '../resdbquery.js';

const deleteData = (tableName='', req, res) => {

    let sql = `UPDATE ${tableName} SET delete_on = NOW() WHERE code = '${req.params.uid}'`;
    playdb(sql, res);

}


export default deleteData;