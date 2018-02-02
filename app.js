// Initialize express object
var express = require('express')
  , path = require('path')
  , app = express()

// Global root directory for the application
global.__basedir = __dirname
global.__visualsdir = __dirname + '/views/visualizations'

// Serve the static files to client (in this case, .css files)
app.use(express.static(path.join(__dirname, 'public')))

// Import routes from controllers
app.use(require(__dirname + '/controllers'))

// localhost:3000
app.listen(3000, function () {
    console.log('Listening on port 3000')
})
