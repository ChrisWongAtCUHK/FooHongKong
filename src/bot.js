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

bot.onText(/\/start/, function (msg) {
  var name = msg.from.first_name;
  bot.sendMessage(msg.chat.id, 'Hello, ' + name + '!').then(function () {
    // reply sent!
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
module.exports = bot;
