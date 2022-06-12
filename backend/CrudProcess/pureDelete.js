import playdb from '../resdbquery.js';

const pureDelete = (tableName='', req, res) => {

    let sql = `DELETE FROM ${tableName} WHERE code = '${req.params.uid}'`;
    playdb(sql, res);

}

export default pureDelete;