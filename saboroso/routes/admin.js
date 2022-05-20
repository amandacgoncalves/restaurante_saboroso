const { Router } = require('express');
var express = require ('express');
const users = require('../inc/users');
var users = require('./../inc/users');
var admin = require('./../inc/admin');
var menus = require('./../inc/menus');
var reservations = require ('./../inc/reservations');
var moment = require('moment');
var router = express.Router();

moment.locale('pt-BR');

router.use(function (req, res, next){

    if (['/login'].indexOf(req.url) === -1 &&!req.session.user) {
        res.redirect('admin/login');
    } else {
          next();
    }

});//router use 

router.use(function(req, res, next){
    req.menus = admin.getMenus(req);

    next();
});//admin get menus

router.get('logout', function(req, res, next){
    
    delete req.session.user;

    res.redirect('admin/login')
    
})//router get logout

router.get('/', function(req, res, next) {

    admin.dashboard().then(data=>{

        res.render('admin/index', admin.getParams(req, {
            data
        }));

    }).catch(err =>{
        console.error(err);
    });//admin dashboard

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

    res.render('admin/contacts', admin.getParams(req));

});//router get contacts 

router.get('/emails', function(req, res, next) {

    res.render('admin/emails', admin.getParams(req));

});//router get emails

router.get('/menus', function(req, res, next) {

    menus.getMenus().then(data =>{

        res.render('admin/menus', admin.getParams(req, {
            data
        })); 

    });//menu get menus

});//router get menus

router.post('/menus', function(req, res, next){
    
    menus.save(req.fields, req.files).then(results =>{
        res.send(results);
    }).catch(err =>{
        res.send(err);
    });//menus save catch

});//router post()

router.delete('/menus/:id', function (req, res, next) {

    menus.delete(req.params.id).then(results =>{

        res.send(results);

    }).catch(err =>{

        res.send(err);

    });//menus delete

});//router delete

router.get('/reservations', function(req, res, next) {

    reservations.getReservations().then(data =>{

        res.render('admin/reservations', admin.getParams(req, {
            date:{},
            data,
            moment
        }));//res render

    });//get reservations

});//router get reservations

router.post('/reservations', function(req, res, next){
    
    reservations.save(req.fields, req.files).then(results =>{
        res.send(results);
    }).catch(err =>{
        res.send(err);
    });//menus save catch

});//router post()

router.delete('/reservations/:id', function (req, res, next) {

    reservations.delete(req.params.id).then(results =>{

        res.send(results);

    }).catch(err =>{

        res.send(err);

    });//menus delete

});//router delete

router.get('/users', function(req, res, next) {

    users.getUsers().then(data =>{

    res.render('admin/users', admin.getParams(req, {
        data
    }));//res render


    });//users get users

});//router get users

router.post('/users', function(req, res, next) {

    users.save(req.fields).then(results =>{
      
        res.send(results);

    }).catch(err=> {

        res.send(err);

    });//users save 

});//router post users

router.delete('/users/:id', function(req, res, next) {

    users.delete(req.params.id).then(results =>{
      
        res.send(results);

    }).catch(err=> {

        res.send(err);

    });//users delete 

});//router delete users

module.exports = router;