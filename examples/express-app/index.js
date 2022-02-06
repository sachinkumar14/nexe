const express = require('express')
const path = require('path')
const app = express()
app.use('/', express.static(path.join(__dirname, 'public')))


var testdata = 35;
app.listen(8888)

