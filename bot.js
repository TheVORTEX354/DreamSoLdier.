const Discord = require('discord.js');
const db = require('quick.db');
const client = new Discord.Client();
const ayarlar = require('./ayarlar.json');
const chalk = require('chalk');
const fs = require('fs');
const { key } = require('./ayarlar.json');
const YouTube = require('simple-youtube-api');
const moment = require('moment');
require('./util/eventLoader')(client);
const youtube = new YouTube(key)
const queue = new Map();  
const ytdl = require('ytdl-core');
let kufurEngel = JSON.parse(fs.readFileSync("./jsonlar/kufurEngelle.json", "utf8"));

var prefix = ayarlar.prefix;


client.on("message", message => {
  if (!message.mentions.members.first()) return;
  else if (message.mentions.members.first().id === client.user.id) {
      return message.reply("Merhaba! \nBen DreamSoLdier. \n1 Yaşındayım 2020'den Beri Size Hizmet Vermekten Gurur Duyarım!!\nPrefixim: // (Veya sizin ayarladığınız prefix)\nYapımcım: <@482910932725661696>!!\n//prefix Yazarak Prefixim'i Değiştirebilirsiniz.\nÖrnek: //prefix +\nBot Deilim Sadece Kalbim Pilli :(\nİyi Günler!!");
  } else return;
});

const log = message => {
  console.log(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] ${message}`);
};

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir('./komutlar/', (err, files) => {
  if (err) console.error(err);
  log(`${files.length} komut yüklenecek.`);
  files.forEach(f => {
    let props = require(`./komutlar/${f}`);
    log(`Yüklenen komut: ${props.help.name}.`);
    client.commands.set(props.help.name, props);
    props.conf.aliases.forEach(alias => {
      client.aliases.set(alias, props.help.name);
    });
  });
});

client.reload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e){
      reject(e);
    }
  });
};

client.load = command => {
  return new Promise((resolve, reject) => {
    try {
      let cmd = require(`./komutlar/${command}`);
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e){
      reject(e);
    }
  });
};

client.unload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      resolve();
    } catch (e){
      reject(e);
    }
  });
};

client.elevation = message => {
  if(!message.guild) {
	return; }
  let permlvl = 0;
  if(message.member.hasPermission("MANAGE_MESSAGES")) permlvl = 1;
  if(message.member.hasPermission("MANAGE_ROLES")) permlvl = 2;
  if(message.member.hasPermission("MANAGE_CHANNELS")) permlvl = 3;
  if(message.member.hasPermission("KICK_MEMBERS")) permlvl = 4;
  if(message.member.hasPermission("BAN_MEMBERS")) permlvl = 5;
  if(message.member.hasPermission("ADMINISTRATOR")) permlvl = 6;
  if(message.author.id === message.guild.sahipID) permlvl = 7;
  return permlvl;
}; 

///////////////////////////////////////////////////////Müzik


client.on('message', async msg => {

	if (msg.author.bot) return false;
	if (!msg.content.startsWith(prefix)) return false;

	const args = msg.content.split(' ');
	const searchString = args.slice(1).join(' ');
	const url = args[1] ? args[1].replace(/<(.+)>/g, '$1') : '';
	const serverQueue = queue.get(msg.guild.id);
	let command = msg.content.split(' ')[0].slice(ayarlar.prefix.length);
	//command = command.slice(prefix.length)

	if (command === 'çal' || command === "p" || command === "play") {
		const voiceChannel = msg.member.voiceChannel;
		if (!voiceChannel) return msg.channel.send(new Discord.RichEmbed()
      .setColor('#FF0000')
    .setDescription(':warning: | İlk olarak sesli bir kanala giriş yapmanız gerek.'));
		const permissions = voiceChannel.permissionsFor(msg.client.user);
		if (!permissions.has('CONNECT')) {
			return msg.channel.send(new Discord.RichEmbed()
    .setColor('#FF0000')
    .setTitle(':warning: | İlk olarak sesli bir kanala giriş yapmanız gerek.'));
		}
		if (!permissions.has('SPEAK')) {
			 return msg.channel.send(new Discord.RichEmbed()
      .setColor('#FF0000')
      .setTitle(':warning: | Şarkı başlatılamıyor. Lütfen mikrofonumu açınız.'));
        }

		if (url.match(/^https?:\/\/(www.youtube.com|youtube.com)\/playlist(.*)$/)) {
			const playlist = await youtube.getPlaylist(url);
			const videos = await playlist.getVideos();
			for (const video of Object.values(videos)) {
				const video2 = await youtube.getVideoByID(video.id);
				await handleVideo(video2, msg, voiceChannel, true);
			}
			 return msg.channel.send(new Discord.RichEmbed)
      .setTitle(`**✅ | Oynatma Listesi: **${playlist.title}** Kuyruğa Eklendi!**`)
		} else {
			try {
				var video = await youtube.getVideo(url);
			} catch (error) {
				try {
					var videos = await youtube.searchVideos(searchString, 10);
					let index = 0;
          
				 msg.channel.send(new Discord.RichEmbed()                  
         .setTitle('DreamSoLdier | Şarkı Seçimi')
         .setDescription(`${videos.map(video2 => `**${++index} -** ${video2.title}`).join('\n')}`)
         .setFooter('Lütfen 1-10 arasında bir rakam seçiniz 10 saniye içinde liste iptal edilecektir.')
         .setColor('#FF0000'));
          msg.delete(5000)
					try {
						var response = await msg.channel.awaitMessages(msg2 => msg2.content > 0 && msg2.content < 11, {
							maxMatches: 1,
							time: 10000,
							errors: ['time']
						});
					} catch (err) {
						console.error(err);
						 return msg.channel.send(new Discord.RichEmbed()
            .setColor('#FF0000')
            .setDescription(':warning: | **Şarkı Değeri Belirtmediğiniz İçin Seçim İptal Edilmiştir**.'));
                    }
					const videoIndex = parseInt(response.first().content);
					var video = await youtube.getVideoByID(videos[videoIndex - 1].id);
				} catch (err) {
					console.error(err);
					return msg.channel.send(new Discord.RichEmbed()
          .setColor('#FF0000')
          .setDescription(':( | **Aradım Fakat Hiç Bir Sonuç Çıkmadı**'));
                }
            }
			return handleVideo(video, msg, voiceChannel);
      
		}
	} else if (command === 'geç' || command === "s" || command === "skip") {
		if (!msg.member.voiceChannel) if (!msg.member.voiceChannel) return msg.channel.send(new Discord.RichEmbed()
    .setColor('#FF0000')
    .setDescription(' :warning: | **Lütfen öncelikle sesli bir kanala katılınız**.'));
		if (!serverQueue) return msg.channel.send(new Discord.RichEmbed()
     .setColor('#FF0000')
     .setTitle(' :warning: | **Hiç Bir Müzik Çalmamakta**'));                                              
		serverQueue.connection.dispatcher.end('**Müziği Geçtim!**');
		return undefined;
	} else if (command === 'durdur' || command === "stop") {
		if (!msg.member.voiceChannel) if (!msg.member.voiceChannel) return msg.channel.send(new Discord.RichEmbed()
    .setColor('#FF0000')
    .setDescription('**:warning: | Lütfen öncelikle sesli bir kanala katılınız.**'));
		if (!serverQueue) return msg.channel.send(new Discord.RichEmbed()
     .setColor('#FF0000')
     .setTitle(':warning: **| Hiç Bir Müzik Çalmamakta**'));                                              
		msg.channel.send(`:stop_button: **${serverQueue.songs[0].title}** Adlı Müzik Durduruldu`);
		serverQueue.songs = [];
		serverQueue.connection.dispatcher.end('**Müzik Bitti**');
		return undefined;
	} else if (command === 'ses' || command === "volume") {
		if (!msg.member.voiceChannel) if (!msg.member.voiceChannel) return msg.channel.send(new Discord.RichEmbed()
    .setColor('#FF0000')
    .setDescription(':warning: **| Lütfen öncelikle sesli bir kanala katılınız.**'));
		if (!serverQueue) return msg.channel.send(new Discord.RichEmbed()
     .setColor('#FF0000')
     .setTitle(':warning:| **Hiç Bir Müzik Çalmamakta**'));                                              
		if (!args[1]) return msg.channel.send(new Discord.RichEmbed()
   .setTitle(`:warning: Şuanki Ses Seviyesi: **${serverQueue.volume}**`)
    .setColor('#FF0000'))
		serverQueue.volume = args[1];
    if(args[1] > 100) {
      msg.channel.send("100'den büyük bir ses seviyesi ayarlanamaz!")
    } else {
    serverQueue.connection.dispatcher.setVolumeLogarithmic(args[1] / 5);
		return msg.channel.send(new Discord.RichEmbed()
    .setTitle(`:hammer:  Ses Seviyesi Ayarlanıyor: **${args[1]}**`)
    .setColor('#FF0000'));     
    }               
	} else if (command === 'çalan' || command === "song" || command === "current" || command === "şarkı") {
		if (!serverQueue) return msg.channel.send(new Discord.RichEmbed()
    .setTitle(":warning: | **Çalan Müzik Bulunmamakta**")
    .setColor('#FF0000'));
		return msg.channel.send(new Discord.RichEmbed()
    .setColor('#FF0000')
    .setTitle("DreamSoLdier | Çalan")                            
    .addField('Başlık', `[${serverQueue.songs[0].title}](${serverQueue.songs[0].url})`, true)
    .addField("Süre", `${serverQueue.songs[0].durationm}:${serverQueue.songs[0].durations}`, true))
	} else if (command === 'sıra' || command === "liste" || command === "queue") {
    let index = 0;
		if (!serverQueue) return msg.channel.send(new Discord.RichEmbed()
    .setTitle(":warning: | **Sırada Müzik Bulunmamakta**")
    .setColor('#FF0000'));
		  return msg.channel.send(new Discord.RichEmbed()
    .setColor('#FF0000')
     .setTitle('DreamSoLdier | Şarkı Kuyruğu')
    .setDescription(`${serverQueue.songs.map(song => `**${++index} -** ${song.title}`).join('\n')}`))
    .addField('Şu anda çalınan: ' + `${serverQueue.songs[0].title}`);
	} else if (command === 'duraklat' || command === "pause") {
		if (serverQueue && serverQueue.playing) {
			serverQueue.playing = false;
			serverQueue.connection.dispatcher.pause();
			return msg.channel.send(new Discord.RichEmbed()
      .setTitle("**:pause_button: Müzik Senin İçin Durduruldu!**")
      .setColor('#FF0000'));
		}
		return msg.channel.send(':warning: | **Çalan Müzik Bulunmamakta**');
	} else if (command === 'devam' || command === "devam-et" || command === "devamet" || command === "resume") {
		if (serverQueue && !serverQueue.playing) {
			serverQueue.playing = true;
			serverQueue.connection.dispatcher.resume();
			return msg.channel.send(new Discord.RichEmbed()
      .setTitle("**:arrow_forward: Müzik Senin İçin Devam Etmekte!**")
      .setColor('#FF0000'));
		}
		return msg.channel.send(new Discord.RichEmbed()
    .setTitle(":warning: ** | Çalan Müzik Bulunmamakta.**")
    .setColor('#FF0000'));
	}
  

	return undefined;
});

async function handleVideo(video, msg, voiceChannel, playlist = false) {
    const serverQueue = queue.get(msg.guild.id);
    console.log(video);
    const song = {
        id: video.id,
        title: video.title,
        url: `https://www.youtube.com/watch?v=${video.id}`,
    durationh: video.duration.hours,
    durationm: video.duration.minutes,
        durations: video.duration.seconds,
    views: video.views,
    };
	if (!serverQueue) {
		const queueConstruct = {
			textChannel: msg.channel,
			voiceChannel: voiceChannel,
			connection: null,
			songs: [],
			volume: 5,
			playing: true
		};
		queue.set(msg.guild.id, queueConstruct);

		queueConstruct.songs.push(song);

		try {
			var connection = await voiceChannel.join();
			queueConstruct.connection = connection;
			play(msg.guild, queueConstruct.songs[0]);
		} catch (error) {
			console.error(`:warning: **Şarkı Sisteminde Problem Var Hata Nedeni: ${error}**`);
			queue.delete(msg.guild.id);
			return msg.channel.send(new Discord.RichEmbed()
      .setTitle(`:warning: **Şarkı Sisteminde Problem Var Hata Nedeni: ${error}**`)
      .setColor('#FF0000'))
		}
	} else {
		serverQueue.songs.push(song);
		console.log(serverQueue.songs);
		if (playlist) return undefined;
		return msg.channel.send(new Discord.RichEmbed()
    .setTitle(`:arrow_heading_up:  **${song.title}** Adlı Müzik Kuyruğa Eklendi!`)
    .setColor('#FF0000'))
	}
	return undefined;
}

function play(guild, song) {
	const serverQueue = queue.get(guild.id);

	if (!song) {
		serverQueue.voiceChannel.leave();
		queue.delete(guild.id);
		return;
	}
	console.log(serverQueue.songs);

	const dispatcher = serverQueue.connection.playStream(ytdl(song.url))
		.on('end', reason => {
			if (reason === ' :x:  | **Yayın Akış Hızı Yeterli Değil.**') console.log('Müzik Bitti.');
			else console.log(reason);
			serverQueue.songs.shift();
			play(guild, serverQueue.songs[0]);
		})
		.on('error', error => console.error(error));
	dispatcher.setVolumeLogarithmic(serverQueue.volume / 5);

	 serverQueue.textChannel.send(new Discord.RichEmbed()                                   
  .setTitle("**DreamSoLdier | 🎙 Müzik Başladı**",`https://cdn.discordapp.com/avatars/473974675194511361/6bb90de9efe9fb80081b185266bb94a6.png?size=2048`)
  .setThumbnail(`https://i.ytimg.com/vi/${song.id}/default.jpg?width=80&height=60`)
  .addField('\nBaşlık', `[${song.title}](${song.url})`, true)
  .addField("\nSes Seviyesi", `${serverQueue.volume}%`, true)
  .addField("Süre", `${song.durationm}:${song.durations}`, true)
  .setColor('#FF0000'));
}

/////////////////////////////////////////////






client.on("guildMemberAdd", async member => {
  const fs = require('fs');
  let gc = JSON.parse(fs.readFileSync("./ayarlar/gc.json", "utf8"));
    
    const hgK = member.guild.channels.get(gc[member.guild.id].gkanal)
      if (!hgK) return;
          let username = member.user.username;
     
              const bg = await Jimp.read("https://cdn.discordapp.com/attachments/597433546868654106/627436322839199755/hg.png");
              const userimg = await Jimp.read(member.user.avatarURL);
              var font;
              if (member.user.tag.length <10) font = await Jimp.loadFont(Jimp.FONT_SANS_64_WHITE);
              else if (member.user.tag.length > 0) font = await Jimp.loadFont(Jimp.FONT_SANS_32_WHITE);
              else font = await Jimp.loadFont(Jimp.FONT_SANS_32_WHITE);
              await bg.print(font, 245, 300, member.user.tag);
              await userimg.resize(187, 169);////boyut
              await bg.composite(userimg, 317, 15).write("./img/"+ member.id + ".png");
                setTimeout(function () {
                      hgK.send(new Discord.Attachment("./img/" + member.id + ".png"));
                }, 1000);
                setTimeout(function () {
                  fs.unlink("./img/" + member.id + ".png");
                }, 10000);
          let hgm = JSON.parse(fs.readFileSync("./ayarlar/hgm.json", "utf8"));
      const hgmK = member.guild.channels.get(hgm[member.guild.id].gkanal)
      var kullanici = member.tag
      var sunucu = member.guild.name
      hgmK.send(`${gc[member.guild.id].mesaj}`)
      })
  client.on("guildMemberRemove", async member => {
  const fs = require('fs');
  let gc = JSON.parse(fs.readFileSync("./ayarlar/gc.json", "utf8"));
      const hgK = member.guild.channels.get(gc[member.guild.id].gkanal)
      if (!hgK) return;
          let username = member.user.username;
           
                          const bg = await Jimp.read("https://cdn.discordapp.com/attachments/597433546868654106/627436724125040664/bb.png");
              const userimg = await Jimp.read(member.user.avatarURL);
              var font;
               if (member.user.tag.length <10) font = await Jimp.loadFont(Jimp.FONT_SANS_64_WHITE);
              else if (member.user.tag.length > 0) font = await Jimp.loadFont(Jimp.FONT_SANS_32_WHITE);
              else font = await Jimp.loadFont(Jimp.FONT_SANS_32_WHITE);
              await bg.print(font, 245, 300, member.user.tag);
              await userimg.resize(189, 173);////boyut
              await bg.composite(userimg, 317, 15).write("./img/"+ member.id + ".png");///sağa sola, yukarı aşşa
                setTimeout(function () {
                      hgK.send(new Discord.Attachment("./img/" + member.id + ".png"));
                }, 1000);
                setTimeout(function () {
                  fs.unlink("./img/" + member.id + ".png");
                }, 10000);
          
      })

//////////////////////////






client.on("guildMemberAdd", async(member) => {
  let sunucupaneli = await db.fetch(`sunucupanel_${member.guild.id}`)
  if(sunucupaneli) {
    let rekoronline = await db.fetch(`panelrekor_${member.guild.id}`)
    let toplamuye = member.guild.channels.find(x =>(x.name).startsWith("Toplam Üye •"))
    let toplamaktif = member.guild.channels.find(x =>(x.name).startsWith("Aktif Üye •"))
    let botlar = member.guild.channels.find(x =>(x.name).startsWith("Botlar •"))
    let rekoraktif = member.guild.channels.find(x =>(x.name).startsWith("Rekor Aktiflik •"))
    
    if(member.guild.members.filter(off => off.presence.status !== 'offline').size > rekoronline) {
      db.set(`panelrekor_${member.guild.id}`, member.guild.members.filter(off => off.presence.status !== 'offline').size)
    }
    try{
      toplamuye.setName(`Toplam Üye • ${member.guild.members.size}`)
      toplamaktif.setName(`Aktif Üye • ${member.guild.members.filter(off => off.presence.status !== 'offline').size}`)
      botlar.setName(`Botlar • ${member.guild.members.filter(m => m.user.bot).size}`)
      rekoraktif.setName(`Rekor Aktiflik • ${rekoronline}`)
   } catch(e) { }
  }
})
//Efe Tarafından Kodlanmıştır Çalınması Kesinlikle YASAKTIR !
client.on("guildMemberRemove", async(member) => {
  let sunucupaneli = await db.fetch(`sunucupanel_${member.guild.id}`)
  if(sunucupaneli) {
    let rekoronline = await db.fetch(`panelrekor_${member.guild.id}`)
    let toplamuye = member.guild.channels.find(x =>(x.name).startsWith("Toplam Üye •"))
    let toplamaktif = member.guild.channels.find(x =>(x.name).startsWith("Aktif Üye •"))
    let botlar = member.guild.channels.find(x =>(x.name).startsWith("Botlar •"))
    let rekoraktif = member.guild.channels.
    find(x =>(x.name).startsWith("Rekor Aktiflik •"))
    
    if(member.guild.members.filter(off => off.presence.status !== 'offline').size > rekoronline) {
      db.set(`panelrekor_${member.guild.id}`, member.guild.members.filter(off => off.presence.status !== 'offline').size)
    }
    try{
      toplamuye.setName(`Toplam Üye • ${member.guild.members.size}`)
      toplamaktif.setName(`Aktif Üye • ${member.guild.members.filter(off => off.presence.status !== 'offline').size}`)
      botlar.setName(`Botlar • ${member.guild.members.filter(m => m.user.bot).size}`)
      rekoraktif.setName(`Rekor Aktiflik • ${rekoronline}`)
   } catch(e) { }
  }
})

//////////////////////////////////////



 







////////////////////////////////////////////


client.on("message", async msg => {
  const request = require('node-superfetch');
  const db = require('quick.db');
  const ms = require('parse-ms')
  let timeout = 600000
  let dakdest = await db.fetch(`goldzzz_${msg.author.id}`);
  let i = db.fetch(`gold_${msg.author.id}`)
            if (i == 'gold') {
      if (dakdest !== null && timeout - (Date.now() - dakdest) > 0) {
          let time = ms(timeout - (Date.now() - dakdest));
      } else {
    if(msg.author.bot) return;   
    if (msg.content.length > 1) {
  db.set(`goldzzz_${msg.author.id}`, Date.now());
     msg.channel.send('**Yolu Açın Bir Gold Üye Belirdi!!**')
    }
  };
            }
     else if (i == undefined) {           
            }
            if (!i) return;
          
  });

//////////////////////////////////////////////////////////



client.on('guildMemberAdd', member => {
  let guvenlik= db.fetch(`bottemizle_${member.guild.id}`)
     if (!guvenlik) return;
     if(member.user.bot !==true){
     } else {
    member.kick(member) 
   }  
   });



//////////////////////////////////////////



client.on("message" , async message => {
  const msg = message;
  if(message.content.startsWith(ayarlar.prefix+"afk")) return; 
  let afk = message.mentions.users.first()
  
  const kisi = db.fetch(`afkid_${message.author.id}_${message.guild.id}`)
  
  const isim = db.fetch(`afkAd_${message.author.id}_${message.guild.id}`)
 if(afk){
   const sebep = db.fetch(`afkSebep_${afk.id}_${message.guild.id}`)
   const kisi3 = db.fetch(`afkid_${afk.id}_${message.guild.id}`)
   if(message.content.includes(kisi3)){
     const embed = new Discord.RichEmbed()
      .setColor("#0080FF")
      .setAuthor("DreamSoLdier" , "https://media.discordapp.net/attachments/680821445441749024/681856243249315876/indir2.jpg")
      .setDescription(`Etiketlediğiniz Kişi Afk \n Sebep : ${sebep}`)
      .setTimestamp()
      .setFooter(`${message.author.username} Tarafından İstendi`)
       message.channel.send(embed)
   }
 }
  if(message.author.id === kisi){
    const embed = new Discord.RichEmbed()
      .setColor("#0080FF")
      .setAuthor("DreamSoLdier" , "https://media.discordapp.net/attachments/680821445441749024/681856243249315876/indir2.jpg")
      .setDescription(`Afk'lıktan Çıktınız`)
      .setTimestamp()
      .setFooter(`${message.author.username} Tarafından İstendi`)
       message.channel.send(embed)
   db.delete(`afkSebep_${message.author.id}_${message.guild.id}`)
   db.delete(`afkid_${message.author.id}_${message.guild.id}`)
   db.delete(`afkAd_${message.author.id}_${message.guild.id}`)
    message.member.setNickname(isim)
    
  }
  
})







////////////////////////////////////////////////////////////sa-as

client.on('message', async (msg, member, guild) => {
  let i = await  db.fetch(`saas_${msg.guild.id}`)
      if(i === 'açık') {
        if (msg.content.toLowerCase() === 'sa') {
          const embed = new Discord.RichEmbed()
          .addField("! =", "Aleykümselam kardeşim, hoşgeldin ^^")
          .setColor("BLACK")
    msg.channel.send(embed);     
} 
}
});


/////////////////////////////////

client.on('message', async message => {
  let ke = await db.fetch(`kufur_${message.guild.id}`)
  
  if (ke === "kapali" || ke === undefined || ke === null){
    return;
  } else if (ke === "acik") {
    let küfür = ["piç", "pıç", "orospu","orspu","skm","ananı skm","aq","am","ananı sikiyim","ananı sikim","orspu cocugu","orspu cocu","ananı yerim","ananı ısırıyım","anaskm","göt","orduspor","göt","göt lalesi","götün","yarram","yrrm","yarrak","sikim","sik","sikiş","sokuş","anan","ananın","ananın amı","ann amı","xx","xnxx","xxnx","nxxn","oç","oc","o.c","o.ç","amk","amına","amına koyim","amına koyuyum","amına koyum","amık"]
     if (küfür.some(word => message.content.includes(word))){
         if (!message.member.hasPermission("BAN_MEMBERS")) {
         message.delete();
         message.channel.send(""+ message.author.tag +"Uzaya Fırlamak İstemiyorsan Küfretmeyi Kes").then(msg => msg.delete(5000));
       }
     }
     
   }
 })

//////////////////////////////////////////////

client.on("guildMemberRemove", async member => {
  let kanal = await db.fetch(`davetkanal_${member.guild.id}`);
  if (!kanal) return;
  let veri = await db.fetch(`rol1_${member.guild.id}`);
  let veri12 = await db.fetch(`roldavet1_${member.guild.id}`);
  let veri21 = await db.fetch(`roldavet2_${member.guild.id}`);
  let veri2 = await db.fetch(`rol2_${member.guild.id}`);
  let d = await db.fetch(`bunudavet_${member.id}`);
  const sa = client.users.get(d);
  const sasad = member.guild.members.get(d);
  let sayı2 = await db.fetch(`davet_${d}_${member.guild.id}`);
  db.add(`davet_${d}_${member.guild.id}`, -1);

  if (!d) {
    const aa = new Discord.RichEmbed()
      .setColor("BLACK")
      .setDescription(
        `\`\`${member.user.tag}\`\` **adlı şahıs aramızdan ayrıldı.\nŞahsı davet eden:** \`\`Bulunamadı!\`\``
      )
      .setFooter(client.user.username, client.user.avatarURL);
    client.channels.get(kanal).send(aa);
    return;
  } else {
    const aa = new Discord.RichEmbed()
      .setColor("BLACK")
      .setDescription(
        `\`\`${member.user.tag}\`\` **adlı şahıs aramızdan ayrıldı.\nŞahsı davet eden:** \`\`${sa.tag}\`\``
      )
      .setFooter(client.user.username, client.user.avatarURL);
    client.channels.get(kanal).send(aa);

    if (!veri) return;

    if (sasad.roles.has(veri)) {
      if (sayı2 <= veri12) {
        sasad.removeRole(veri);
        return;
      }
    }
    if (sasad.roles.has(veri2)) {
      if (!veri2) return;
      if (sayı2 <= veri21) {
        sasad.removeRole(veri2);
        return;
      }
    }
  }
});

client.on("guildMemberAdd", async member => {
  member.guild.fetchInvites().then(async guildInvites => {
    let veri = await db.fetch(`rol1_${member.guild.id}`);
    let veri12 = await db.fetch(`roldavet1_${member.guild.id}`);
    let veri21 = await db.fetch(`roldavet2_${member.guild.id}`);
    let veri2 = await db.fetch(`rol2_${member.guild.id}`);
    let kanal = await db.fetch(`davetkanal_${member.guild.id}`);
    if (!kanal) return;
    const ei = invites[member.guild.id];

    invites[member.guild.id] = guildInvites;

    const invite = guildInvites.find(i => ei.get(i.code).uses < i.uses);
    const sasad = member.guild.members.get(invite.inviter.id);
    const davetçi = client.users.get(invite.inviter.id);

    db.add(`davet_${invite.inviter.id}_${member.guild.id}`, +1);
    db.set(`bunudavet_${member.id}`, invite.inviter.id);
    let sayı = await db.fetch(`davet_${invite.inviter.id}_${member.guild.id}`);

    let sayı2;
    if (!sayı) {
      sayı2 = 0;
    } else {
      sayı2 = await db.fetch(`davet_${invite.inviter.id}_${member.guild.id}`);
    }

    const aa = new Discord.RichEmbed()
      .setColor("BLACK")
      .setDescription(
        `\`\`${member.user.tag}\`\` **adlı şahıs sunucuya katıldı.\nŞahsı davet eden:** \`\`${davetçi.tag}\`\`\n**Toplam \`\`${sayı2}\`\` daveti oldu!**`
      )
      .setFooter(client.user.username, client.user.avatarURL);
    client.channels.get(kanal).send(aa);
    if (!veri) return;

    if (!sasad.roles.has(veri)) {
      if (sayı2 => veri12) {
        sasad.addRole(veri);
        return;
      }
    } else {
      if (!veri2) return;
      if (sayı2 => veri21) {
        sasad.addRole(veri2);
        return;
      }
    }
  });
});


//////////////////////////////////////////
















//////////////////////////////////////////////////////////

var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;
// client.on('debug', e => {
//   console.log(chalk.bgBlue.green(e.replace(regToken, 'that was redacted')));
// });

client.on('warn', e => {
  console.log(chalk.bgYellow(e.replace(regToken, 'that was redacted')));
});

client.on('error', e => {
  console.log(chalk.bgRed(e.replace(regToken, 'that was redacted')));
});

client.login(ayarlar.token);
