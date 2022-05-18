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

    }//login

}//module exports 