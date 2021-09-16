const Discord = require('discord.js')
const config = require('../config.json')
const embeds = require('../embeds/Commands/embeds.js')
const fs = require('fs')

module.exports = {
    name: 'set',
    guildOnly: false, 
    adminOnly: true, 
    execute(message, args){
        if(!args[0])return message.reply('No Webhook Event Specified!');
        config.webhook_channels[args[0]] = message.channel.id;
        fs.writeFile('./config.json',JSON.stringify(config,null,' \t'),function(err,data){
            const embed = embeds.WebhookChannel(args[0],message.channel.id)
            message.channel.send(embed);
            return message.reply('Reload bot for changes to take effect')
        });
    }
}