const express = require('express');
const app = express();
const path = require('path');

console.log(__dirname);
//for allowing page to access static resources
app.use('/js',express.static(path.join(__dirname, '../client/js')));
app.use('/css',express.static(path.join(__dirname, '../client/css')));
app.use('/img',express.static(path.join(__dirname, '../client/img')));


app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname,'/../client/index.html'));
});

app.listen(8080, function () {
    //don't forget, this code is not running in the browser, it will display when the node commnad is run to start the app
    console.log('Express test listening on port 8080!');
});