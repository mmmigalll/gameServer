var express = require('express');
var fs = require('fs');
var path = require('path');
var app = express();
var pathC = __dirname + "/template/script/coordinate.js";
app.use(express.static(__dirname + '/template'));

require('./routers/index.js')(app);



/*app.get('/move/:x/:y', function(req, res, next){
   var x = req.params.x;
   var y = req.params.y;
   var o = {};
   o.x = x;
   o.y = y;
   res.send("UPI");
   var s = "var move = " + JSON.stringify(o);
   fs.writeFile(pathC, s, function(){
      console.log("--- UPI ---");
   });
});*/


app.listen(3000, function(){
   console.log('--- Server up successfully ---');
});