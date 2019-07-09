const Discord = require('discord.js');

const client = new Discord.Client();
const { DISCORD_TOKEN } = process.env;

client.once('ready', () => {
  if (DISCORD_TOKEN) {
    // eslint-disable-next-line no-console
    console.log('DawgBot is now running!');
  }
});

client.on('message', (message) => {
  if (message.content === '!!!Dawg') {
    message.channel.send('Yo Dawg. It\'s me DawgBot');
  }
});

client.login(DISCORD_TOKEN);
