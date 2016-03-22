var express = require('express');
var app  = express();




app.use(express.static(__dirname + "/"));





app.listen(3000, function(err){
  if (err) throw err;
  console.log('Server is running!');
});
