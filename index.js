const Discord = require('discord.js');
const request = require('request');
const { getImages } = require('./utils');

const client = new Discord.Client();
const url = 'https://www.reddit.com/r/dankmemes/top.json?limit=3&t=hour';
const { DISCORD_TOKEN } = process.env;
const { prefix } = require('./config');
const {
  dankmemes,
  awwnime,
} = require('./commands');

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
  if (message.content === `${prefix} ${dankmemes}`) {
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
  if (message.content === `${prefix} ${awwnime.command}`) {
    request.get('https://www.reddit.com/r/awwnime/top.json?limit=3&t=day', (_err, _res, body) => {
      const images = getImages(body);
      let i = 1;
      Object.values(images).forEach((image) => {
        const response = new Discord.MessageEmbed()
          .setColor('#0099ff')
          .setTitle(`Awwnime #${i}`)
          .setImage(image);
        message.channel.send(response);
        i += 1;
      });
    });
  }
});

client.login(DISCORD_TOKEN);
