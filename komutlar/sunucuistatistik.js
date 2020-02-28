const Discord = require('discord.js');
exports.run = (client, message, args, ops) => {
  var juke = new Discord.RichEmbed()
 
    .setDescription(`**Sunucu Kullanıcı Durumları
:green_heart: Çevrimiçi:   ${message.guild.members.filter(m=>m.presence.status == 'online').size}
:heart: Rahatsız Etmeyin:       ${message.guild.members.filter(m=>m.presence.status == 'dnd').size}
:yellow_heart: Boşta:      ${message.guild.members.filter(m=>m.presence.status == 'idle').size}   
:black_heart: Çevrimdışı:   ${message.guild.members.filter(m=>m.presence.status == 'offline').size} 
:blue_heart:   Toplam:  ${message.guild.memberCount}**`)        
   .setColor('GOLD')
         message.channel.send({juke});
}
module.exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['sunucui'],
    permLevel: 0
};

module.exports.help = {
    name: 'sunucu-istatistik',
    description: '',
    usage: 'sunucu'
};