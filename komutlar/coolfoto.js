const Discord = require("discord.js"); // BU KOMUT RİDENLİVE TARAFINDAN EDİTLENMİŞTİR

module.exports.run = async (bot, message, args) => {
  

  //RİDENLİVE
  

    let replies = ["https://i.postimg.cc/QdrCtW6N/12421.jpg","https://i.postimg.cc/s2TgwH31/13421.jpg,","https://i.postimg.cc/t4tTVCf3/21312.jpg","https://i.postimg.cc/KYGY7hSd/21321.jpg","https://i.postimg.cc/zB3XMwf7/21421.jpg","https://i.postimg.cc/bJFdNC54/21sa.jpg","https://i.postimg.cc/j2w2W602/21sd.jpg","https://i.postimg.cc/Y059Q4M3/21sfa.jpg","https://i.postimg.cc/fWpkGPm9/231.jpg","https://i.postimg.cc/ZKN04LxD/2431.jpg","https://i.postimg.cc/FRqsQfd4/ascas.jpg","https://i.postimg.cc/z3YzV9F2/ascsa.jpg","https://i.postimg.cc/gjZccY86/asdas.jpg","https://i.postimg.cc/bYD1SkR1/asdaso-j.jpg","https://i.postimg.cc/jqpPH28m/asdaw.jpg","https://i.postimg.cc/vH593ykB/asdsa.jpg","https://i.postimg.cc/jSKf19Yh/cvcx.jpg","https://i.postimg.cc/TPNWp3Lk/qwfsa.jpg","https://i.postimg.cc/TPNWp3Lk/qwfsa.jpg","https://i.postimg.cc/vZznwzQw/sacams.jpg","https://i.postimg.cc/gJwLRb3G/sadsaj.jpg","https://i.postimg.cc/QMdT8Tt9/wcsa23.jpg","https://i.postimg.cc/bJKD9VRk/wdcsa.jpg","https://i.postimg.cc/qqytbcmY/wdsa.jpg","https://i.postimg.cc/pVFnLx2Z/wqcsa.jpg","https://i.postimg.cc/yYC3J5xz/wqdsa.jpg","https://i.postimg.cc/MK0M1Dff/wqfsa.jpg","https://i.postimg.cc/sgVBmh56/wqsa.jpg","https://i.postimg.cc/cLXvbLms/wqvcsa.jpg"];

    let result = Math.floor((Math.random() * replies.length));

    let gifembed = new Discord.RichEmbed()
        .setTitle("Fotoğrafın! ")
        .setColor("RED")
        .setFooter(`Cool Fotoğraf!`, message.author.avatarURL)
        .setImage(replies[result]);
  
  
  //RİDENLİVE

    message.channel.send(gifembed);
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['coolfoto','cool','fotocool'],
  permLevel: 0
};

exports.help = {
  name: 'coolfoto',
  description: 'Rastgele Cool fotoğraflar atar.',
  usage: 'cool'
}; 