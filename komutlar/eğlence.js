const Discord = require('discord.js');


exports.run = function(client, message) {
const embed = new Discord.RichEmbed()
.setColor('RANDOM')
.setTitle('» DreamSoLdier Komutlar\n» Prefix: // (Veya Belirlenen Prefix)')
.setTimestamp()
.addField('» Eğlence Komutu', 'rastgele-emoji')
.addField('» Eğlence Komutu', 'wtcN')
.addField('» Eğlence Komutu', 'elreann')
.addField('» Eğlence Komutu', 'coolfoto')
.addField('» Eğlence Komutu', 'triggered')
.addField('» Eğlence Komutu', 'tkm')
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
  name: 'eğlence',
  description: 'Tüm komutları gösterir.',
  usage: 'yardım'
};