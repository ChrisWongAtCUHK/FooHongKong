var token = process.env.TOKEN;

var Bot = require('node-telegram-bot-api');
var bot;
var { Client } = require("pg");

if(process.env.NODE_ENV === 'production') {
  bot = new Bot(token);
  bot.setWebHook(process.env.HEROKU_URL + bot.token);
}
else {
  bot = new Bot(token, { polling: true });
}

console.log('Bot server started in the ' + process.env.NODE_ENV + ' mode');

bot.onText(/\/start/, (msg) => {  
  bot.sendMessage(msg.chat.id, "Welcome", {
  "reply_markup": {
      "keyboard": [["Sample text", "Second sample"],   ["Keyboard"], ["I'm robot"], ["hi"], ["location"]]
      }
  });   
});

bot.onText(/\/help/, function (msg) {
  var client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: true,
  });

  client.connect();
  client.query('SELECT ID, NAME, SALARY FROM COMPANY;', (err, res) => {
    if (err) throw err;
    var resp = [];
    for (let row of res.rows) {
      let person = [];
      for (const prop in row) {
        person.push(`${prop} : ${row[prop]}`);
      }
      resp.push(person.join("\n"));
    }
    bot.sendMessage(msg.chat.id, resp.join("\n\n")).then(function(){

    });

    client.end();
  });
  
});

bot.onText(/\/todo/, function (msg) {
  bot.sendMessage(msg.chat.id, 'busy').then(function () {
    // reply sent!
  });
});

bot.onText(/\/gg/, function (msg) {
  bot.sendMessage(msg.chat.id, 'Good Game!').then(function () {
    // reply sent!
  });
});

bot.on('message', (msg) => {
  var Hi = "hi";
  if (msg.text.toString().toLowerCase().indexOf(Hi) === 0) {
    bot.sendMessage(msg.chat.id,"<b>bold</b> \n <i>italic</i> \n <em>italic with em</em> \n <a href=\"http://www.example.com/\">inline URL</a> \n <code>inline fixed-width code</code> \n <pre>pre-formatted fixed-width code block</pre>" ,{parse_mode : "HTML"});
  }
});

bot.on('message', (msg) => {
    var location = "location";
    if (msg.text.indexOf(location) === 0) {
        bot.sendLocation(msg.chat.id,44.97108, -104.27719);
        bot.sendMessage(msg.chat.id, "Here is the point");

    }
});

bot.on('message', (msg) => {
    
  var bye = "bye";
  if (msg.text.toString().toLowerCase().includes(bye)) {
    bot.sendMessage(msg.chat.id, "Have a nice day " + msg.from.first_name); 
  } 

});

bot.on('message', (msg) => {
    
  var bye = "say";
  if (msg.text.toString().toLowerCase().includes(bye)) {
    bot.sendMessage(msg.chat.id, "You say something."); 
  } 

});

bot.on('message', (msg) => {
    
  var heroku = "heroku";
  if (msg.text.toString().toLowerCase().includes(heroku)) {
    bot.sendMessage(msg.chat.id, "Heroku suck."); 
  } 

});

bot.on('message', (msg) => {
    
  var what = "idiot";
  if (msg.text.includes(what)) {
    bot.kickChatMember(msg.chat.id,  msg.from.id);
  }    

});

module.exports = bot;
