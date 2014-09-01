var app = require('http').createServer(handler);
var io = require('socket.io')(app);
var fs = require('fs');
var url = require('url');

app.listen(5426);

function handler(req, rsp) {
	var endpoint = url.parse(req.url, true);
	console.log(endpoint);

	if(endpoint.pathname == '/table'){

		fs.readFile(__dirname + '/table.html', function(err, data) {
			if(err){
				rsp.writeHead(500);
				return rsp.end('Error reading table.html');
			}

			rsp.writeHead(200);
			rsp.end(data);
		});
	} else if (endpoint.pathname == '/player') {

		fs.readFile(__dirname + '/player.html', function(err, data) {
			if(err){
				rsp.writeHead(500);
				return rsp.end('Error reading player.html');
			}

			rsp.writeHead(200);
			rsp.end(data);
		});
	} else {
		fs.readFile(__dirname + endpoint.pathname, function(err, data) {
			if(err){
				rsp.writeHead(404);
				return rsp.end('404: address not found');
			}

			rsp.writeHead(200);
			rsp.end(data);
		});

	}

}

io.on('connection', function(socket) {
	console.log(socket);
	socket.on('login', function(username) {
		console.log('User ' + username + ' just connected');
	});
});

