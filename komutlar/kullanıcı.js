const Discord = require('discord.js');


exports.run = function(client, message) {
const embed = new Discord.RichEmbed()
.setColor('RANDOM')
.setTitle('» DreamSoLdier Komutlar\n» Prefix: // (Veya Belirlenen Prefix)')
.setTimestamp()
.addField('» Kullanıcı Komutu', 'sunucu-istatistik')
.addField('» Kullanıcı Komutu', 'spotify')
.addField('» Kullanıcı Komutu', 'rank (seviye)')
.addField('» Kullanıcı Komutu', 'kapaklaflar')
.addField('» Kullanıcı Komutu', 'davetstokla/davetoluştur/davetlerim')
.addField('» Kullanıcı Komutu', 'afk')
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
  name: 'kullanıcı',
  description: 'Tüm komutları gösterir.',
  usage: 'yardım'
};