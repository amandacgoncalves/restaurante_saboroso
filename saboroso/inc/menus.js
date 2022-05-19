let conn = require(`./db`);
let path = require('path');
const { resolve } = require('path');

module.exports = {

    getMenus(){

        return new Promise((resolve, reject)=>{

            conn.query(`
            SELECT * FROM tb_menus ORDER BY title
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

        fields.photo = `images/${path.parse(files.photo.path).base}`;

        let query, queryPhoto = '', params = [
          fields.title,
          fields.description,
          fields.price
        ];

        if (files.photo.name) {

          queryPhoto = ',photo = ?'

          params.push(fields.photo);

        }

        if(parseInt(fields.id) > 0) {

          params.push(fields.id);

          query =`
            UPDATE tb_menus
            SET title = ?,
              descripton = ?,
              price = ?,
              photo = ?
            WHERE id = ?
          `;

        } else {

          if (!files.photo.name) {
            reject('Envie a foto do prato.');
          }

          query = `
          INSERT INTO tb_menus (title, description, price, photo)
          VALUES (?, ?, ?, ?)
          `;

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
          DELETE FROM tb_menus WHERE id = ?
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

    }//delete 

}//module exports