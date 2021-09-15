const Discord = require('discord.js')
const config = require('../../config.json');

module.exports = {
    name: 'order:disputed',
    webhook: true,
    channel: config.webhook_channels['order:disputed'] ?config.webhook_channels['order:disputed']:config.webhook_channels['default'],
    execute(data){
        const embed = new Discord.MessageEmbed()
        .setTitle('PayPal Dispute Created')
        .setURL(`https://dashboard.sellix.io/orders/view/${data.uniqid}?shop=76766`)
        .setDescription(`A PayPal dispute has been opened for invoice ${data.uniqid}.`)
        .setThumbnail('https://cdn.sellix.io/static/logo/single-less-border.png')
        .addFields(
            {name: 'Invoice', value: data.uniqid, inline:true},
            {name: 'Product', value: data.product_title, inline:true},
            {name: 'Dispute', value: `${data.paypal_dispute.reason}`,inline:true},
            {name: 'Type', value: data.type, inline:true},
            {name: 'Serials', value: (data.serials)?data.serials:"NULL", inline:true},
            {name: 'Cycle', value: data.paypal_dispute.life_cycle_stage, inline:true},
        )
        .setFooter('This is a webhook notification from Sellix.io Discord Bot (github/fsalinas26)')
        .setTimestamp();
        return embed;        
    }
}