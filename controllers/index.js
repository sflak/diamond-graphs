var express = require('express')
  , router = express.Router()
  , path = require('path')

// Homepage
router.get('/', function(req, res) {
    console.log(req.json)
    res.sendFile(__basedir + '/views/home.html')
})

// Routers for each page
router.use(require(__dirname + '/line'))

module.exports = router