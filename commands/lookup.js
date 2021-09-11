const Sellix = require('sellix-api-wrapper');
const config = require('../config.json');
const API = new Sellix.API(config.sellix_auth);
const Discord = require('discord.js');

function embedOrder(data) {
	const dataEmbed = new Discord.MessageEmbed()
		.setTitle('Lookup Data')
		.setDescription(`Data for Order: **${data.uniqid}**`)
        .setThumbnail('https://i.ibb.co/fnGjLXc/bb545da78ff3a7d3db5466819642bb62.png')
		.addFields(
			{ name: 'Product: ', value: `${data.product_title} (${data.product_id})`, inline: true },
			{ name: 'Quantity: ', value: data.quantity, inline: true },
            { name: 'Price: ', value: `$${data.total}`, inline: true },
		)
        .addField('\u200B', '\u200B','\u200B', true)
        .addFields(
			{ name: 'Email: ', value: data.customer_email, inline: true },
			{ name: 'Date: ', value: `${data.month} ${data.day_value}, ${data.year}`, inline: true },
		)
		.addField('\u200B', '\u200B', true)
		.addFields(
            { name: 'Status: ', value: data.status, inline: true },
			{ name: 'Gateway: ', value: data.gateway, inline: true },
		)
        .addField('\u200B', '\u200B', true)
		.addFields(
			{ name: 'Type: ', value: data.product_type, inline: true },
			{ name: `${data.product_type}`, value: (data.product_type==="SERIALS")?data.serials:data.file_attachment_uniqid, inline: true },
		)
		.addField('\u200B', '\u200B', true)
		.setTimestamp()
		.setColor('#00ff3c');

	return dataEmbed;
}

function embedProduct(data) {
	const dataEmbed = new Discord.MessageEmbed()
		.setTitle('Lookup Product')
		.setDescription(`Data for Product: **${data.uniqid}**`)
        .setThumbnail('https://i.ibb.co/fnGjLXc/bb545da78ff3a7d3db5466819642bb62.png')
		.addFields(
			{ name: 'Title: ', value: `${data.title}`, inline: true },
			{ name: 'Price: ', value: `$${data.price}`, inline: true },
		)
        .addField('\u200B', '\u200B', true)
        .addFields(
			{ name: 'Type: ', value: data.type, inline: true },
			{ name: 'Stock: ', value: data.stock,inline: true},
		)
		.addField('\u200B', '\u200B', true)
		.addFields(
            { name: 'Sold: ', value: data.sold_count, inline: true },
            { name: 'Average Score: ', value: data.average_score, inline: true },
		)
        .addField('\u200B','\u200B', true)
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
                        const orderEmbed = embedOrder(data.data.order);
                        return message.reply(orderEmbed);
                }).catch(err=>{
                        console.log(err.message);
                        return message.reply(err.message);
                })
                
                break;
            case 'product':
                if(!args[1])return message.reply('Missing Product ID!')
                API.getProduct(args[1]).then(data=>{
                        const productEmbed = embedProduct(data.data.product);
                        return message.reply(productEmbed);
                }).catch(err=>{
                        console.log(err.message);
                        return message.reply(err.message);
                })
                break;
            case 'email':
                API.getAllOrders().then(data=>{
                    let orderArr = [];
                    for(obj of data.data.orders)
                        orderArr.push(obj);
                    var order = orderArr.find(o=>o.customer_email === args[1]);
                    API.getOrder(order.uniqid).then(data=>{
                        const orderEmbed = embedOrder(data.data.order);
                        return message.reply(orderEmbed);
                    })
            }).catch(err=>{
                    console.log(err.message);
                    return message.reply(err.message);
            })
                break;
            default:
                break;
        }
    }
}