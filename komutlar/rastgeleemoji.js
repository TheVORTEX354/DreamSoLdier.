const Discord = require('discord.js');
const DEmojiJS = require('demojijs');;

exports.run = (client, message, args) => {
  DEmojiJS.randomEmoji().then(Emoji => {
    const embed = new Discord.RichEmbed()
    .setTitle(Emoji.title)
    .setColor("RANDOM")
    .setFooter(`Emojilerin kaynağı: https://discordemoji.com`)
    .setImage(Emoji.image)
    message.channel.send(embed)
}).catch(message.reply(`Emoji Yükleniyor...!`));
}

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ['rastgeleemoji', 'rastgelemoji'],
  permLevel: 0
};

exports.help = {
  name: 'rastgele-emoji',
  description: 'Rastgele emoji atar.',
  usage: 'rastgele-emoji'
};