const Discord = require("discord.js"); // BU KOMUT RİDENLİVE TARAFINDAN EDİTLENMİŞTİR.

module.exports.run = async (bot, message, args) => {
  


    let replies = ["https://i.postimg.cc/bNtpkF7q/123.jpg","https://i.postimg.cc/PJ8sbPFS/12312h.jpg","https://i.postimg.cc/9MQc9Xhk/123d.jpg","https://i.postimg.cc/3xQ7BFhm/123-h12.jpg","https://i.postimg.cc/RZwC5bdg/12dsa.jpg","https://i.postimg.cc/R09SMQb4/12eqw-hdg.jpg","https://i.postimg.cc/TwNfJ823/12f.jpg","https://i.postimg.cc/kGV9jjDF/12safd.jpg","https://i.postimg.cc/nr6xNvD8/12u3g12.jpg","https://i.postimg.cc/ZqcT0B13/12uy3g12.jpg","https://i.postimg.cc/7Z14QJPc/213.jpg","https://i.postimg.cc/66SB7N1H/21hs.jpg","https://i.postimg.cc/YSbHtcWz/324f.jpg","https://i.postimg.cc/FRzQRPb5/343.jpg","https://i.postimg.cc/hjYR79MJ/465.jpg","https://i.postimg.cc/F15tTNMN/asfda.jpg","https://i.postimg.cc/667ybckm/auwhge12.jpg","https://i.postimg.cc/BnC6PVFX/edff.jpg","https://i.postimg.cc/VvMsfG1s/ervg.jpg","https://i.postimg.cc/fL1Th4Gg/qwd12.jpg","https://i.postimg.cc/KvSvq2r1/qwdas.jpg","https://i.postimg.cc/QdS8dWL7/qwe.jpg","https://i.postimg.cc/xjb13CHr/qwehwq.jpg","https://i.postimg.cc/yNdVgYBb/qweuhqw.jpg","https://i.postimg.cc/yYm62bvv/qwewq.jpg","https://i.postimg.cc/W1spVwyj/wqdh-u.jpg","https://i.postimg.cc/3R0Y1Skj/wqeuhwq.jpg","https://i.postimg.cc/NFhYz6X3/wqu8ehqw.jpg","https://i.postimg.cc/05m9J4RP/wwefw.jpg",];

    let result = Math.floor((Math.random() * replies.length));

    let gifembed = new Discord.RichEmbed()
        .setTitle("Fotoğrafın! <a:heart:553341691822866442>")
        .setColor("RED")
        .setFooter(`wtcN Fotoğraf!`, message.author.avatarURL)
        .setImage(replies[result]);
  

    message.channel.send(gifembed);
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['wtcn','wtcN'],
  permLevel: 0
};
//RİDENLİVE
exports.help = {
  name: 'wtcN',
  description: 'Rastgele wtcN fotoğrafları atar.',
  usage: 'wtcn'
}; 
