var conn = require('./db')

module.exports = {

    getEmails() {

        return new Promise((resolve, reject) =>{

            conn.query(`
                SELECT * FROM tb_emails ORDER BY email
            `, (err, results) => {

                if(err) {
                    reject(err);
                } else {
                    resolve(results)
                }

            });//conn query

        });//return new promise 

    },//get emails 

    delete(id) {

        return new Promise((resolve, reject)=>{

            conn.query(`
                DELETE FROM tb_emails WHERE id = ?
            `, [
                id
            ], (err, results) =>{

                if(err) {
                    reject(err);
                } else {
                    resolve(results);
                }

            });//conn query

        });//return new promise

    },//delete

    save(req) {
       
        return new Promise((resolve, reject)=>{


            if (!req.fields.email) {
                reject('Preencha o email.');
            } else {
                conn.query(`
                INSERT INTO tb_emails (email) VALUES (?)
                `, [
                req.fields.email
                ], (err, results)=>{
                if (err) {
                    reject(err.message)
                } else {
                    resolve(results);
                }

                });//conn query

            }//if

        });//return new promise
        
    }//save
    
}//module exports 