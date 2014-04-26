/**
 * Module dependencies.
 */

var express = require('express')
  , http = require('http')
  , sio = require('socket.io');

/**
 * App.
 */
var app = express();

/**
 * App configuration.
 */
app.configure(function () {
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.set('port', process.env.PORT || 3000);
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

/**
 * App routes.
 */

app.get('/', function (req, res) {
  res.render('index', { title: 'Chatex' });
});

/**
 * App listen.
 */
 
var server = http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

/**
 * Socket.IO server (single process only)
 */

var io = sio.listen(server)
  , nicknames = {};

// Set our transports

io.configure(function () { 
  io.set("transports", ["xhr-polling"]); 
  io.set("polling duration", 20); 
});


io.sockets.on('connection', function (socket) {
  socket.on('user message', function (msg) {
    socket.broadcast.emit('user message', socket.nickname, msg);
  });
  
  socket.on('is typing', function (msg) {
    socket.broadcast.emit('typing', socket.nickname, msg);
  });
  
  socket.on('end typing', function (msg) {
    socket.broadcast.emit('typingend', socket.nickname, msg);
  });

  socket.on('nickname', function (nick, fn) {
    if (nicknames[nick]) {
      fn(true);
    } else {
      fn(false);
      nicknames[nick] = socket.nickname = nick;
      socket.broadcast.emit('announcement', nick + ' connected');
      io.sockets.emit('nicknames', nicknames);
    }
  });

  socket.on('logout', function () {
    if (!socket.nickname) return;

    delete nicknames[socket.nickname];
    socket.broadcast.emit('announcement', socket.nickname + ' disconnected');
    socket.broadcast.emit('nicknames', nicknames);
  });
});
