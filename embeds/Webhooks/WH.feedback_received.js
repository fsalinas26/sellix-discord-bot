const Discord = require('discord.js')
const config = require('../../config.json');
module.exports = {
    name: 'feedback:received',
    Webhook: true,
    channel: config.webhook_channels['feedback:received'] ?config.webhook_channels['feedback:received']:config.webhook_channels['default'],
    execute(data){
        const embed = new Discord.MessageEmbed()
        .setTitle('New Feedback Recevied')
        .setURL(`https://dashboard.sellix.io/feedback/reply/${data.invoice.uniqid}?shop=76766`)
        .setDescription('You have received new feedback!')
        .setThumbnail('https://cdn.sellix.io/static/logo/single-less-border.png')
        .addFields(
            {name: 'Product', value: data.product_title, inline:true},
            {name: 'Review', value: data.message, inline:true},
            {name: 'Stars', value: `${data.score}/5`,inline:true},
        )
        .setFooter('This is a webhook notification from Sellix.io Discord Bot (github/fsalinas26)')
        .setTimestamp();
        return embed;        
    }
}