const Discord = require('discord.js');
const request = require('request');
const { getImages } = require('./utils');

const client = new Discord.Client();
const { DISCORD_TOKEN } = process.env;
const { prefix } = require('./config');
const {
  dankmemes,
  awwnime,
  smug,
  rule34,
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
  if (message.content === `${prefix} ${dankmemes.command}`) {
    request.get(dankmemes.url, (_err, _response, body) => {
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
    request.get(awwnime.url, (_err, _res, body) => {
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

  if (message.content === `${prefix} ${rule34.command}`) {
    try {
      //7 digit id
      const smugResponse = rule34.url + Math.floor(Math.random() * 9000000) + 1000000;
      message.channel.send({
        files: [smugResponse]
      })
    } catch (err) {
      console.log(err)
      message.channel.send("Server detected too much lewdness")
    }
  }

  if (message.content === `${prefix} ${smug.command}`) {
    try {
      //60 possible pics
      const smugResponse = smug.url + Math.floor(Math.random() * 59) + 1 + ".png"
      message.channel.send({
        files: [smugResponse]
      })
    } catch (err) {
      console.log(err)
      message.channel.send("Server detected too much smuggness")
    }
  }
  
});

client.login(DISCORD_TOKEN);
