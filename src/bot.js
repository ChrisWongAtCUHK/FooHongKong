var token = process.env.TOKEN;

var Bot = require('node-telegram-bot-api');
var bot;

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
      "keyboard": [["Sample text", "Second sample"],   ["Keyboard"], ["I'm robot"]]
      }
  });   
});

bot.onText(/\/help/, function (msg) {
  bot.sendMessage(msg.chat.id, '1234567').then(function () {
    // reply sent!
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

module.exports = bot;
