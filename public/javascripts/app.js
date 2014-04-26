
$(document).ready(function(){
	var socket = io.connect();
	
	//Emoticon support
	var definition = {smile:{title:"Smile",codes:[":)",":=)",":-)"]},"sad-smile":{title:"Sad Smile",codes:[":(",":=(",":-("]},"big-smile":{title:"Big Smile",codes:[":D",":=D",":-D",":d",":=d",":-d"]},cool:{title:"Cool",codes:["8)","8=)","8-)","B)","B=)","B-)","(cool)"]},wink:{title:"Wink",codes:[":o",":=o",":-o",":O",":=O",":-O"]},crying:{title:"Crying",codes:[";(",";-(",";=("]},sweating:{title:"Sweating",codes:["(sweat)","(:|"]},speechless:{title:"Speechless",codes:[":|",":=|",":-|"]},kiss:{title:"Kiss",codes:[":*",":=*",":-*"]},"tongue-out":{title:"Tongue Out",codes:[":P",":=P",":-P",":p",":=p",":-p"]},blush:{title:"Blush",codes:["(blush)",":$",":-$",":=$",':">']},wondering:{title:"Wondering",codes:[":^)"]},sleepy:{title:"Sleepy",codes:["|-)","I-)","I=)","(snooze)"]},dull:{title:"Dull",codes:["|(","|-(","|=("]},"in-love":{title:"In love",codes:["(inlove)"]},"evil-grin":{title:"Evil grin",codes:["]:)",">:)","(grin)"]},talking:{title:"Talking",codes:["(talk)"]},yawn:{title:"Yawn",codes:["(yawn)","|-()"]},puke:{title:"Puke",codes:["(puke)",":&",":-&",":=&"]},"doh!":{title:"Doh!",codes:["(doh)"]},angry:{title:"Angry",codes:[":@",":-@",":=@","x(","x-(","x=(","X(","X-(","X=("]},"it-wasnt-me":{title:"It wasn't me",codes:["(wasntme)"]},party:{title:"Party!!!",codes:["(party)"]},worried:{title:"Worried",codes:[":S",":-S",":=S",":s",":-s",":=s"]},mmm:{title:"Mmm...",codes:["(mm)"]},nerd:{title:"Nerd",codes:["8-|","B-|","8|","B|","8=|","B=|","(nerd)"]},"lips-sealed":{title:"Lips Sealed",codes:[":x",":-x",":X",":-X",":#",":-#",":=x",":=X",":=#"]},hi:{title:"Hi",codes:["(hi)"]},call:{title:"Call",codes:["(call)"]},devil:{title:"Devil",codes:["(devil)"]},angel:{title:"Angel",codes:["(angel)"]},envy:{title:"Envy",codes:["(envy)"]},wait:{title:"Wait",codes:["(wait)"]},bear:{title:"Bear",codes:["(bear)","(hug)"]},"make-up":{title:"Make-up",codes:["(makeup)","(kate)"]},"covered-laugh":{title:"Covered Laugh",codes:["(giggle)","(chuckle)"]},"clapping-hands":{title:"Clapping Hands",codes:["(clap)"]},thinking:{title:"Thinking",codes:["(think)",":?",":-?",":=?"]},bow:{title:"Bow",codes:["(bow)"]},rofl:{title:"Rolling on the floor laughing",codes:["(rofl)"]},whew:{title:"Whew",codes:["(whew)"]},happy:{title:"Happy",codes:["(happy)"]},smirking:{title:"Smirking",codes:["(smirk)"]},nodding:{title:"Nodding",codes:["(nod)"]},shaking:{title:"Shaking",codes:["(shake)"]},punch:{title:"Punch",codes:["(punch)"]},emo:{title:"Emo",codes:["(emo)"]},yes:{title:"Yes",codes:["(y)","(Y)","(ok)"]},no:{title:"No",codes:["(n)","(N)"]},handshake:{title:"Shaking Hands",codes:["(handshake)"]},skype:{title:"Skype",codes:["(skype)","(ss)"]},heart:{title:"Heart",codes:["(h)","<3","(H)","(l)","(L)"]},"broken-heart":{title:"Broken heart",codes:["(u)","(U)"]},mail:{title:"Mail",codes:["(e)","(m)"]},flower:{title:"Flower",codes:["(f)","(F)"]},rain:{title:"Rain",codes:["(rain)","(london)","(st)"]},sun:{title:"Sun",codes:["(sun)"]},time:{title:"Time",codes:["(o)","(O)","(time)"]},music:{title:"Music",codes:["(music)"]},movie:{title:"Movie",codes:["(~)","(film)","(movie)"]},phone:{title:"Phone",codes:["(mp)","(ph)"]},coffee:{title:"Coffee",codes:["(coffee)"]},pizza:{title:"Pizza",codes:["(pizza)","(pi)"]},cash:{title:"Cash",codes:["(cash)","(mo)","($)"]},muscle:{title:"Muscle",codes:["(muscle)","(flex)"]},cake:{title:"Cake",codes:["(^)","(cake)"]},beer:{title:"Beer",codes:["(beer)"]},drink:{title:"Drink",codes:["(d)","(D)"]},dance:{title:"Dance",codes:["(dance)","\\o/","\\:D/","\\:d/"]},ninja:{title:"Ninja",codes:["(ninja)"]},star:{title:"Star",codes:["(*)"]},mooning:{title:"Mooning",codes:["(mooning)"]},finger:{title:"Finger",codes:["(finger)"]},bandit:{title:"Bandit",codes:["(bandit)"]},drunk:{title:"Drunk",codes:["(drunk)"]},smoking:{title:"Smoking",codes:["(smoking)","(smoke)","(ci)"]},toivo:{title:"Toivo",codes:["(toivo)"]},rock:{title:"Rock",codes:["(rock)"]},headbang:{title:"Headbang",codes:["(headbang)","(banghead)"]},bug:{title:"Bug",codes:["(bug)"]},fubar:{title:"Fubar",codes:["(fubar)"]},poolparty:{title:"Poolparty",codes:["(poolparty)"]},swearing:{title:"Swearing",codes:["(swear)"]},tmi:{title:"TMI",codes:["(tmi)"]},heidy:{title:"Heidy",codes:["(heidy)"]},myspace:{title:"MySpace",codes:["(MySpace)"]},malthe:{title:"Malthe",codes:["(malthe)"]},tauri:{title:"Tauri",codes:["(tauri)"]},priidu:{title:"Priidu",codes:["(priidu)"]}};
	$.emoticons.define(definition);
	
      socket.on('connect', function () {
        $('#chat').addClass('connected');
      })

      socket.on('announcement', function (msg) {
        $('#lines').append($('<p>').append($('<em>').text(msg)));
      })

      socket.on('nicknames', function (nicknames) {
        $('#nicknames').empty().append($('<span>Online: </span>'));
        for (var i in nicknames) {
          $('#nicknames').append($('<b>').text(nicknames[i]));
        }
      });

      socket.on('user message', message);
	  
      socket.on('typing', messageTyping);
      socket.on('typingend', messageTypingEnd);
	  
      socket.on('reconnect', function () {
        $('#lines').remove();
        message('System', 'Reconnected to the server');
      })

      socket.on('reconnecting', function () {
        message('System', 'Attempting to re-connect to the server');
      })

      socket.on('error', function (e) {
        message('System', e ? e : 'A unknown error occurred');
      })
	  
	  var original = document.title;
	  var timeout;
	  
	  window.flashTitle = function (newMsg, howManyTimes) 
	  {
		function step() {
			document.title = (document.title == original) ? newMsg : original;

			if (--howManyTimes > 0) {
				timeout = setTimeout(step, 1000);
			};
		};

		howManyTimes = parseInt(howManyTimes);

		if (isNaN(howManyTimes)) {
			howManyTimes = 5;
		};

		cancelFlashTitle(timeout);
		step();
		
	  }
	  
	  window.cancelFlashTitle = function () {
			clearTimeout(timeout);
			document.title = original;
	  };

      function message (from, msg) {
		//Notify user for new message arrival
		if(from=='me')	
			$('#lines').append($('<p style="text-align:right">').append($('<b>').text(from), $.emoticons.replace(msg)));
		else
		{
			$('#lines').append($('<p>').append($('<b>').text(from), $.emoticons.replace(msg)));
			var newMsg = from+' says...';
			if($("input#message").is(":focus")){
				document.title = original;
			}else{
				flashTitle(newMsg);
			}
		}
		$('#lines').get(0).scrollTop = 10000000;
      }
	  
	  function messageTyping (from, msg) {
        $('#typing').text(from + msg);
      }
	  
	  function messageTypingEnd (from, msg) {
        $('#typing').empty();
      }
	  

	function clear () {
	  $('#message').val('').focus();
	};
	
	$('#sennd').click(function () {
		if($('#nick').val() == '') return false;
          socket.emit('nickname', $('#nick').val(), function (set) {
            if (!set) {
              clear();
              return $('#chat').addClass('nickname-set');
            }
            $('#nickname-err').css('visibility', 'visible');
          });
          return false;
    });
	
	$('#send-message').submit(function () {
		  if($('#message').val() == '') return false; //Blank messages are not allowed
          message('me', $('#message').val());
          socket.emit('user message', $('#message').val());
          clear();
          $('#lines').get(0).scrollTop = 10000000;
          return false;
    });
	
	//Person is typing
	var typing = false;
	var timeout = undefined;
	function timeoutFunction(){
	  typing = false;
	  socket.emit('end typing',' is typing');
	}
	
	$('input#message').keyup(function (e) {
	  if(typing == false) {
		typing = true
		socket.emit('is typing',' is typing....');
		timeout = setTimeout(timeoutFunction, 1000);
	  } else {
		clearTimeout(timeout);
		timeout = setTimeout(timeoutFunction, 1000);
	  }
	});
	
	$('#disconnect').click(function () {
		socket.emit('logout');
		$("#send-message :input").prop("disabled", true);
		$('#lines').append($('<p>').append($('<em>').text('You disconnected')));
		socket.disconnect();
		return false;
	});
	
});