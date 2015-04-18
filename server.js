var express = require('express'),
    server = express();

server.use(express.static(__dirname+'/static'));
server.listen(1337);
