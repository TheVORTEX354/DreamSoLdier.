const Discord = require('discord.js');
const superagent = require('superagent');

exports.run = (client, msg, args) => {
  if (!args[0]) return msg.channel.send(`Katogori belirt ama bu kanal uygun deil ama bir dene`)
  if (msg.channel.nsfw === true) {
    superagent.get('https://nekobot.xyz/api/image')
    .query({ type: `${args[0]}`})
    .end((err, response) => {
      msg.channel.send({file: response.body.message});
    });
  } else {
   msg.channel.send(`Bu kanal **Uygunsuz** değil. Uygunsuz ayarlamak için Kanal ayarlarına gidin!`)
  }
    console.log("NSFW-Gif komutu " + msg.author.username + '#' + msg.author.discriminator + " tarafından "+ msg.guild.name + " Adlı sunucuda kullanıldı." )
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'nsfw',
  description: 'P**** Gifleri atar.',
  usage: 'nsfw <kategori>',
  kategori: 'nsfw'
};