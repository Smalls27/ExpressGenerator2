const express = require('express');
const favoriteRouter = express.Router();
const cors = require('./cors');
const authenticate = require('../authenticate');
const Favorite = require('../models/favorites');

favoriteRouter.route('/')
.options(cors.corsWithOptions, (req, res) => res.sendStatus(200))
.get(cors.cors, authenticate.verifyUser, (req, res, next) => {
    Favorite.find({ user: req.user._id })
    .populate('user', 'campsites')
    .then(favorite => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json')
        res.json(favorite)
    })
    .catch(err => res.send(err))
})
.post(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
    Favorite.findOne({ user: req.user._id})
    .then(favorites => {
        if (favorites) {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json')
            res.json(favorites);
        } else {
            Favorite.create({user: req.user._id, campsites: req.body})
            .then(favorites => {
                console.log(favorites)
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json')
                res.json(favorites);
            })
            .catch(err => {
                const error = new Error('Some err')
                next(error)
            })
        }
        })
        .catch(err => next(err));
    
})
.put(cors.corsWithOptions, authenticate.verifyUser, (req, res) => {

})
.delete(cors.corsWithOptions, authenticate.verifyUser, (req, res) => {
    Favorite.findOneAndDelete({user: req.user._id})
    .then(favorite => {
        if (favorite) {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json')
            res.json(favorite)
        } else {
            res.setHeader('Content-Type', 'text/plain')
            res.send('You do not have any favorites to delete.')
        }
    })
})




favoriteRouter.route('/:campsiteId')
.options(cors.corsWithOptions, (req, res) => res.sendStatus(200))
.get(cors.cors, authenticate.verifyUser, (req, res, next) => {

})
.post(cors.corsWithOptions, authenticate.verifyUser, (req, res) => {
    Favorite.findOne({user: req.user._id})
    .then(favorites => {
        favorites.campsites.push(req.params.campsiteId)
    })
    .catch(err => next(err))
})
.put(cors.corsWithOptions, authenticate.verifyUser, (req, res) => {

})
.delete(cors.corsWithOptions, authenticate.verifyUser, (req, res) => {
    Favorite.findOne({user: req.user._id})
    .then(favorites => {
        favorites.campsites.filter(campsite => campsite === req.params.campsiteId)
    })
    .catch(err => next(err))
})


module.exports = favoriteRouter;