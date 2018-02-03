// Initialize express object
var express = require('express')
  , path = require('path')
  , app = express()

// Make base and visualization directories global for easy reference
global.__basedir = __dirname
global.__visualsdir = __basedir + '/views/visualizations'

// Serve the static files to client (in this case, *.css files)
app.use(express.static(path.join(__dirname, 'public')))

// Import routes
app.use(require(__dirname + '/controllers'))

// localhost:3000
app.listen(3000, function () {
    console.log('Listening on port 3000')
})
