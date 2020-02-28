const Discord = require('discord.js');


exports.run = function(client, message) {
const embed = new Discord.RichEmbed()
.setColor('RANDOM')
.setTitle('» DreamSoLdier Komutlar\n» Prefix: // (Veya Belirlenen Prefix)')
.setTimestamp()
.addField('» Yetkili Komutu', 'prefix')
.addField('» Yetkili Komutu', 'sil')
.addField('» Yetkili Komutu', 'ototag/ototagkanal')
.addField('» Yetkili Komutu', 'sa-as')
.addField('» Yetkili Komutu', 'kick')
.addField('» Yetkili Komutu', 'ultrasohbettemizleyici')
.addField('» Yetkili Komutu', 'davetkanal/davetkanalsıfırla/davetsil')
.addField('» Yetkili Komutu', 'küfür aç/kapat')
.addField('» Yetkili Komutu', 'goldyap/goldçıkar')
.addField('» Yetkili Komutu', 'koruma/koruma (bir kez koruma yazdığınıda açar, bir daha yazdığında kapatır!!)')
.addField('» Yetkili Komutu', 'sunucupanel')
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
  name: 'yetkili',
  description: 'Tüm komutları gösterir.',
  usage: 'yardım'
};