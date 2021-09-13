const Discord = require('discord.js');
const macros = require('../macros')

module.exports = {
    name: 'product:stock',
    execute(data){
        if(data.quantity != 0)return;
        console.log(data);
        const embed = new Discord.MessageEmbed()
        .setTitle(`${data.title} OUT OF STOCK`)
        .setURL(`https://dashboard.sellix.io/products/edit/${data.uniqid}`)
        .setDescription('One of your products is out of stock!')
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