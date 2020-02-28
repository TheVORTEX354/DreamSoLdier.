const Discord = require('discord.js');


exports.run = function(client, message) {
const embed = new Discord.RichEmbed()
.setColor('RANDOM')
.setTitle('» DreamSoLdier Komutlar\n» Prefix: // (Veya Belirlenen Prefix)')
.setTimestamp()
.addField('» Genel Komut', 'yardım')
.addField('» Genel Komut', 'ping')
.addField('» Genel Komut', 'davet')
.setFooter('© 2020 MIT Lisans ', client.user.avatarURL)
.setTimestamp()
.setThumbnail(client.user.avatarURL)
message.channel.send(embed)
};

exports.conf = {
  enabled: true,
  guildOnly: false, 
  aliases: [], 
  permLevel: 0 
};

exports.help = {
  name: 'genel',
  description: 'Tüm komutları gösterir.',
  usage: 'yardım'
};