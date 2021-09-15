const Discord = require('discord.js');
const macros = require('../../commands/macros')
const config = require('../../config.json')

module.exports = {
    name: 'query:replied',
    webhook: true,
    channel: config.webhook_channels['query:replied'] ?config.webhook_channels['query:replied']:config.webhook_channels['default'],
    execute(data){
        var lastMsg = data.messages[data.messages.length-1];
        const embed = new Discord.MessageEmbed()
        .setTitle(`Query Reply From ${lastMsg.role}`)
        .setURL(`https://dashboard.sellix.io/queries/${data.uniqid}?shop=76766`)
        .setDescription('A reply to an Open Query has been Received')
        .setThumbnail('https://cdn.sellix.io/static/logo/single-less-border.png')
        .addFields(
            {name: "Query ID", value: data.uniqid, inline: false},
            {name: "Title", value: data.title,inline:false},
            {name: `Reply (${macros.displayTime(data.updated_at)})`, value: lastMsg.message,inline:false})
        .setFooter('This is a webhook notification from Sellix.io Discord Bot (github/fsalinas26)')
        .setTimestamp();
        return embed;        
    }
}