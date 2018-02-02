var express = require('express')
  , router = express.Router()

router.get('/line-graph', function (req, res) {
    res.sendFile(__visualsdir + '/line.html')
})

module.exports = router
