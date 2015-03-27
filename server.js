var express = require('express');
var app = express();

var path = require('path');

app.engine('html', require('ejs').renderFile);
app.use(express.static(__dirname + '/views'));


app.set("views", __dirname + '/views');

require('./routers/index.js')(app);


app.listen(3000, function(){
   console.log('--- Server up successfully ---');
});