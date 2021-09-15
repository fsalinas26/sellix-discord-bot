const Discord = require('discord.js')
const config = require('../config.json')
const embeds = require('../embeds/commands/embeds')
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
            return message.reply(embed);
        });
    }
}