const Sellix = require('sellix-api-wrapper');
const config = require('../config.json');
const API = new Sellix.API(config.sellix_auth);
const Discord = require('discord.js');

function OrderEmbed(data) {
	// for (const value in data) {
	// 	if (data[value] === '') data[value] = 'nil';
	// }
	const dataEmbed = new Discord.MessageEmbed()
		.setTitle('Lookup Data')
		.setDescription(`Data for Order: **${data.uniqid}**`)
        .setThumbnail('https://i.gyazo.com/bb545da78ff3a7d3db5466819642bb62.png ')
		.addFields(
			{ name: 'Product: ', value: `${data.product_title} (${data.product_id})`, inline: true },
			{ name: 'Quantity: ', value: data.quantity, inline: true },
		)
        .addField('\u200B', '\u200B', true)
		.addFields(
			{ name: 'Gateway: ', value: data.gateway, inline: true },
			{ name: 'Status: ', value: data.status, inline: true },
		)
        .addField('\u200B', '\u200B', true)
		.addFields(
			{ name: 'Type: ', value: data.product_type, inline: true },
			{ name: `${data.product_type}`, value: (data.product_type==="SERIALS")?data.serials:data.file_attachment_uniqid, inline: true },
		)
		.addField('\u200B', '\u200B', true)
		.addFields(
			{ name: 'Email: ', value: data.customer_email, inline: true },
			{ name: 'Date: ', value: `${data.month} ${data.day_value}, ${data.year}`, inline: true },
		)
		.addField('\u200B', '\u200B', true)
		.setTimestamp()
		.setColor('#00ff3c');

	return dataEmbed;
}

module.exports = {
    name: "lookup",
    guildOnly: false,
    adminOnly: true,
    execute(message,args){
        if(!args.length)return message.reply('Proper format is **?lookup [type] [id]**')
        const input = args[0];
        switch(input)
        {
            case 'order':
                if(!args[1])return message.reply('Missing Order ID!')
                API.getOrder(args[1]).then(data=>{
                        const orderEmbed = OrderEmbed(data.data.order);
                        return message.reply(order);
                }).catch(err=>{
                        console.log(err.message);
                        return message.reply(err.message);
                })
                
                break;
            case 'product':if(!args[1])return message.reply('Missing Product ID!')
                API.getProduct(args[1]).then(data=>{
                        const orderEmbed = OrderEmbed(data.data.order);
                        return message.reply(order);
                }).catch(err=>{
                        console.log(err.message);
                        return message.reply(err.message);
                })
                break;
            case 'blacklist':
                break;
            default:
                break;
        }
    }
}