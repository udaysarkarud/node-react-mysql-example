import playdb from '../resdbquery.js';

const editData = (tableName='', req, res) => {
    let updateData = '';

    for (let p in req.body) {
        updateData += p + '=' + `'${req.body[p]}'` + ', ';
    }

    let sql = `UPDATE ${tableName} SET ${updateData} updated_on = NOW() WHERE code = '${req.params.uid}'`;
    
    playdb(sql, res);

}


export default editData;