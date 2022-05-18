const { Router } = require('express');
var express = require ('express');
const users = require('../inc/users');
var users = require('./../inc/users')
var admin = require('./../inc/admin')
var router = express.Router();

router.use(function (req, res, next){

    if (['/login'].indexOf(req.url) === -1 &&!req.session.user) {
        res.redirect('admin/login');
    } else {
          next();
    }

});//router use 

router.use(function(req, res, next){
    req.menus = admingetMenus();

    next();
})

router.get('logout', function(req, res, next){
    
    delete req.session.user;

    res.redirect('admin/login')
    
})//router get logout

router.get('/', function(req, res, next) {

        res.render('admin/index', {
            menus: req.menus
        });

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

    res.render('admin/contacts', {
        menus: req.menus
    });

});//router get contacts 

router.get('/emails', function(req, res, next) {

    res.render('admin/emails');

});//router get emails

router.get('/menus', function(req, res, next) {

    res.render('admin/menus', {
        menus: req.menus
    });

});//router get menus

router.get('/reservations', function(req, res, next) {

    res.render('admin/reservations', {
        date: {},
        menus: req.menus
    }); reservations

});//router get reservations

router.get('/users', function(req, res, next) {

    res.render('admin/users', {
        menus: req.menus
    });

});//router get users

module.exports = router;