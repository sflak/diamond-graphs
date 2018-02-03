// Aggregate all routers into this file. Single import needed in app.js
var express = require('express')
  , router = express.Router()
  , path = require('path')

// Homepage
router.get('/', function(req, res) {
    res.sendFile(__basedir + '/views/index.html')
})

// Routers for each page
router.use(require(__dirname + '/line'))

module.exports = router