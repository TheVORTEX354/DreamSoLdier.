const Discord = require('discord.js');
const db = require('quick.db');

exports.run = async (client, message, args) => {
  
  if (!args[0]){
    message.channel.send(":no_entry: Küfür Engel için Doğru Kullanım: `**//küfür-engel aç** / **//küfür-engel kapat**`")
  }
  if (args[0] === 'aç'){
    message.channel.send(":white_check_mark: Küfür Engel başarıyla açıldı! \n Artık küfürler silinecek.")
    
    db.set(`kufur_${message.guild.id}`, "acik")
  }
  if (args[0] === 'kapat'){
    message.channel.send(":white_check_mark: Küfür engel kapatıldı! \n Bundan sonra küfür serbest.")
    
    db.set(`kufur_${message.guild.id}`, "kapali")
  }
}
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["küfür"],
  permLevel: 6
}
exports.help = {
  name: "küfür-engel",
  description: "Küfür engel açar yada kapatır.",
  usage: "küfür-engel"
}