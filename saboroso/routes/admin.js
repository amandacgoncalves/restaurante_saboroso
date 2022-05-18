const { Router } = require('express');
var express = require ('express');
const users = require('../inc/users');
var users = require('./../inc/users')
var router = express.Router();

router.get('/', function(req, res, next) {

    res.render('admin/index');//res render

});//router GET

router.post('/login', function(req, res, next){

    if (!req.body.email) {
        users.render(req, res, 'Preencha o campo e-mail.');
    } else if (!req.body.password) {
        users.render(req, res, 'Preencha o campor senha.');
    } else {
        users.login(req.body.email, req.body.password).then(users=>{
            
            req.session.user = user;

            res.redirect('/admin');

        }).catch(err =>{
            users.render(req, res, err.message || err);
        });//catch
    }//else

});//router post login

router.get('/login', function(req, res, next) {

    users.render(req, res, null);

});//router get login

router.get('/contacts', function(req, res, next) {

    res.render('admin/contacts');//res render

});//router get contacts 

router.get('/emails', function(req, res, next) {

    res.render('admin/emails');//res render

});//router get emails

router.get('/menus', function(req, res, next) {

    res.render('admin/menus');//res render

});//router get menus

router.get('/reservations', function(req, res, next) {

    res.render('admin/reservations', {
        date: {}
    });//res render reservations

});//router get reservations

router.get('/users', function(req, res, next) {

    res.render('admin/users');//res render

});//router get users

module.exports = router;