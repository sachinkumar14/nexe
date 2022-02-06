const express = require('express')
const path = require('path')
const app = express()
app.use('/', express.static(path.join(__dirname, 'public')))

const thisIsTestChange = "new"
var testData = 5

app.listen(8888)

