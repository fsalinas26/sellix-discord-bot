const Discord = require('discord.js');
const config = require('../../config.json')

module.exports = {
    name: 'product:stock',
    webhook: true,
    channel: config.webhook_channels['product:stock'],
    execute(data){
        if(data.stock > 2)return;
        var stock_status = data.stock === 0?"OUT OF STOCK":"LOW ON STOCK"
        const embed = new Discord.MessageEmbed()
        .setTitle(`${data.title} ${stock_status}`)
        .setURL(`https://dashboard.sellix.io/products/edit/${data.uniqid}`)
        .setDescription(`One of your products is ${stock_status.toLowerCase()}`)
        .setThumbnail('https://cdn.sellix.io/static/logo/single-less-border.png')
        .addFields(
            {name: "Uniqid", value: data.uniqid,inline: true},
            {name: "Title", value: data.title,inline:true},
            {name: "Current Quantity", value: data.stock,inline:true},
        )
        .setFooter('This is an automatic Webhook notification from Sellix.io Discord Bot')
        .setTimestamp();
        return embed;        
    }
}