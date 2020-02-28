const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');
var prefix = ayarlar.prefix;
exports.run = (client, message, args) => {
  
    const vortex = new Discord.RichEmbed()
    .setColor('DreamSoLdier')
    .setAuthor(`botun ismi`, client.user.avatarURL) 
.setThumbnail(client.user.avatarURL)
      .addField('** Anime Kategorileri (prefix nsfw)**', '`hentai`, `lewdkitsune`, `neko`, `lewdneko`, `hentai_anal`, `holo`, `coffee`, `kanna`, `kemonomimi`, `gah`,')
      .addField('** Nsfw Kategorileri (prefix nsfw)**', '`pgif`, `anal`, `pussy`, `ass`, `4k`, `gonewild`, `thigh`, `hd`, `hub`,')
    .setFooter(``, client.user.avatarURL)
    .setTimestamp()
    message.channel.send(vortex).catch()

};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 0
};

exports.help = {
    name: 'nsfwhelp',
      category: 'Yardım',
      description: 'Yardım kategorilerini gösteir.',
};