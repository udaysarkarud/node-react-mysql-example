import {db} from './dbservice.js';
const playdb = (sql='',res)=>{
    db.query(sql, (err, result) => {
        if (err) {
            console.log(err)
        }
        res.send(result)
    })
}
export {playdb};