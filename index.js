var express = require('express');
var app = express();
var path = require('path');
  
//settings
app.set('port', process.env.PORT || 3000);

 //start the server
var server = app.listen(app.get('port'), () => {
    console.log('server on port', app.get('port'));
});

//static files
app.use(express.static(path.join(__dirname, 'public')));


//websockets
var SocketIo = require('socket.io');
var io = SocketIo(server);

io.on('connection', (socket) => {
    console.log('new connection', socket.id);

    socket.on('chat:message', (data)=>{
        io.sockets.emit('chat:messages', data);
    });
    socket.on('chat:typing', function(data){
        socket.broadcast.emit('chat:typing', data);
    });
});



