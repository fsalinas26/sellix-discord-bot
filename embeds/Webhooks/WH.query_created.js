const Discord = require('discord.js');
const macros = require('../../commands/macros')
const config = require('../../config.json')

module.exports = {
    name: 'query:created',
    webhook: true,
    channel: config.webhook_channels['query:created'] ?config.webhook_channels['query:created']:config.webhook_channels['default'],
    execute(data){
        const embed = new Discord.MessageEmbed()
        .setTitle(`Query Created`)
        .setURL(`https://dashboard.sellix.io/queries/${data.uniqid}?shop=76766`)
        .setDescription('Someone has contacted you')
        .setThumbnail('https://cdn.sellix.io/static/logo/single-less-border.png')
        .addFields(
            {name: "Query ID", value: data.uniqid, inline: false},
            {name: "Customer Email", value: data.customer_email,inline: false},
            {name: "Title", value: data.title,inline:false},
            {name: `Message (${macros.displayTime(data.messages.created_at)})`, value: data.messages[0].message,inline:false})
        .setFooter('This is a webhook notification from Sellix.io Discord Bot (github/fsalinas26)')
        .setTimestamp();
        return embed;        
    }
}