const { connect } = require("./db")

module.exports = {

    render(req, res, error) {

        res.render('admin/login', {
            body: req.body,
            error
        });//res render

    },
    
    login(email, password) {

        return new Promise((resolve, reject)=>{

            connect.query(`
            SELECT * FROM tb_users WHERE email = ?
            `, [
                email
            ], (err, results)=>{

                if (err) {
                    reject (err)
                } else {

                    if (!results.length > 01) {
                        reject('Usuário ou senha incorretos.');
                    } else {
                        resolve(row);
                    }//else

                }//else

            });//err results

        });//return new promise

    },//login

    getUsers(){

        return new Promise((resolve, reject)=>{

            conn.query(`
            SELECT * FROM tb_users ORDER BY name
            `, (err, results) => {
          
              if (err) {

                reject(err);

              }
          
              resolve(results);
              
            });//conn query
          
          });//new promise

    },


    save(fields, files){

      return new Promise((resolve, reject)=>{

        let query = '', params = [
          fields.name,
          fields.email
        ];

        if(parseInt(fields.id) > 0) {

          params.push(fields.id);

          query =`
            UPDATE tb_users
            SET name = ?,
                email = ?,
            WHERE id = ?
          `;

        } else {

          query = `
          INSERT INTO tb_users (name, email, email)
          VALUES (?, ?, ?)
          `;

          params.push(fields.password)

        }

        conn.query(query ,params, (err, results)=>{
          
          if (err) {
            reject(err);
          } else {
            resolve(results);
          }

        });//insert
        
      });//return new promise 

    },//save

    delete(id) {

      return new Promise((resolve, reject) => {

        conn.query(`
          DELETE FROM tb_users WHERE id = ?
        `, [
          id
        ], (err, result) =>{
        
          if(err) {
            reject(err);
          } else {
            resolve(results);
          }

        });//conn query

      })//new promise

    },//delete 

    changePassword(req) {

        return  new Promise((resolve, reject) => {

            if (!req.fields.password) {
                reject('Preencha a senha.')
            } else if (req.fields.password !== req.fields.passwordConfirm) {
                reject('Confirme sua senha.')
            }else {
                conn.query(`
                UPDATE tb_users
                SET password = ?
                WHERE id = ?
                `, [
                    req.fields.password,
                    req.fields.id
                ], (err, results)=>{
                    if(err){
                        reject(err.message);
                    } else {
                        resolve(results)
                    }
                });//conn quert
            }//if

        });//return new promise

    }//change password

}//module exports 