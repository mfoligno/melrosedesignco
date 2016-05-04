var express = require ('express');

var server = express();
server.use(express.static(__dirname + '/_site', {
  extensions: ['html']
}));

var port = 3000;
server.listen(port, function() {
  console.log('Server listening on port ' + port);
});
