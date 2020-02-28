const Discord = require('discord.js');


exports.run = function(client, message) {
const embed = new Discord.RichEmbed()
.setColor('RANDOM')
.setTitle('» DreamSoLdier Komutlar\n» Prefix: // (Veya Belirlenen Prefix)')
.setTimestamp()
.addField('» Eğlence Komutları', 'eğlence')
.addField('» Yetkili  Komutları', 'yetkili')
.addField('» Genel Komutları', 'genel')
.addField('» Kullanıcı Komutları', 'kullanıcı')
.addField('» Müzik Komutları', 'müzik')
.addField('» Nsfw Komutları', 'nsfwhelp')
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
  name: 'yardım',
  description: 'Tüm komutları gösterir.',
  usage: 'yardım'
};