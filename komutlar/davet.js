const Discord = require('discord.js');

exports.run = async (client, message, args) => {
const embed = new Discord.RichEmbed();
embed.setDescription("**:tik:Beni Davet Etmek İstediğin İçin Teşekkürler, Botu Davet Etmek İçin [TIKLA](https://bit.ly/2Pj7gaE)**")

message.channel.send(embed)
}
exports.conf = {
enabled: true,
guildOnly: false,
aliases: ['davet'],
permLevel: 0
}

exports.help = {
name: 'davet',
};