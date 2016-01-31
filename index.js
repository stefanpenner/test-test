var express = require('express');
var app = express();
var fs = require('fs');

app.use(express.static(__dirname));
app.use(function(req, res, next) {
  console.log(res.originalUrl);
  res.status(404);

  // respond with html page
  if (req.accepts('html')) {
    var FOUR_OH_FOUR = fs.readFileSync('404.html', 'UTF8');
    res.send(FOUR_OH_FOUR);
    return;
  }

  // respond with json
  if (req.accepts('json')) {
    res.send({ error: 'Not found' });
    return;
  }

  // default to plain-text. send()
  res.type('txt').send('Not found');
});

app.listen(3000, function() {
  console.log('Example app listening on port 3000!');
});
