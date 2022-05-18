var express = require ('express');
var router = express.Router();

router.get('/', function(req, res, next) {

    res.render('admin/index');//res render

});//router get

router.get('/login', function(req, res, next) {

    res.render('admin/login');//res render

});//router get

router.get('/contacts', function(req, res, next) {

    res.render('admin/contacts');//res render

});//router get

router.get('/emails', function(req, res, next) {

    res.render('admin/emails');//res render

});//router get

router.get('/menus', function(req, res, next) {

    res.render('admin/menus');//res render

});//router get

router.get('/reservations', function(req, res, next) {

    res.render('admin/reservations', {
        date: {}
    });//res render

});//router get

router.get('/users', function(req, res, next) {

    res.render('admin/users');//res render

});//router get

module.exports = router;