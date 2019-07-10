const Discord = require('discord.js');
const request = require('request');

const client = new Discord.Client();
const url = 'https://www.reddit.com/r/dankmemes/top.json?limit=3&t=hour';
const { DISCORD_TOKEN } = process.env;
const { prefix } = require('./config');

client.once('ready', () => {
  if (DISCORD_TOKEN) {
    // eslint-disable-next-line no-console
    console.log('DawgBot is now running!');
  }
});

client.on('message', (message) => {
  if (message.content === `${prefix}`) {
    message.channel.send('Yo Dawg. It\'s me DawgBot');
  }
  if (message.content === `${prefix} memes`) {
    request.get(url, (_err, _response, body) => {
      const memes = JSON.parse(body).data.children;
      for (let i = 0; i < memes.length; i += 1) {
        const response = new Discord.MessageEmbed()
          .setColor('#0099ff')
          .setTitle(`Fresh Dank Meme #${i + 1}`)
          .setImage(memes[i].data.url);
        message.channel.send(response);
      }
    });
  }
});

client.login(DISCORD_TOKEN);