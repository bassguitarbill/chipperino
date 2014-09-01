$(document).ready(function() {
	console.log('ready!');
	var socket = io('http://localhost:5426');

	$('#submitUserName').click(function () {
		socket.emit('login', $('#userName').val());
	});

});
