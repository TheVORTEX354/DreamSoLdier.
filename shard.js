const Discord = require('discord.js');
const winston = require('winston');
const ayarlar = require('../ayarlar.json')
const winstonLogger = winston.createLogger({
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'log' })
  ],
  format: winston.format.printf((log) => `[${new Date().toLocaleString()}] - [${log.level.toUpperCase()}] - ${log.message}`)
});

const shardingManager = new Discord.ShardingManager('./bot.js', {
  token: ayarlar.token,
  shards: 3
});

shardingManager.spawn().then(() => {
  winstonLogger.info(`[ShardManager] Toplamda ${shardingManager.totalShards} shard başlatıldı`);
}).catch((error) => {
  winstonLogger.error(error);
});