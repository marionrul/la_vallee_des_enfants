var express = require('express');
var router = express.Router();
const modelPost = require('../models/post');

/* ------------------------------------------ ROUTES GET ------------------------------------------------------ */

router.get('/all', function (req, res, next) {
    modelPost.getAll(function (retour) {
        res.send(retour);
    });
});

router.get('/', function (req, res) {
    modelPost.getAllLimit(req.query.limit, req.query.offset, function (retour) {
        res.send(retour)
    })
})

/* ------------------------------------------ ROUTES POST ------------------------------------------------------ */

router.post('/create', function (req, res, next) {
    var post = req.body.post
    modelPost.create(post, function (retour) {
        res.send(retour)
    })
});

/* ------------------------------------------ ROUTES DELETE ------------------------------------------------------ */

router.delete('/delete/:idPost', function (req, res, next) {
    var id = req.params.idPost
    modelPost.delete(id, function (retour) {
        res.send(retour)
    })
});



module.exports = router;