const Discord = require('discord.js')
const macros = require('./macros')

function Order(data) {
    for (var [key, value] of Object.entries(data)) {
        if(!value)
            data[key] = 'nil';
      }
	const dataEmbed = new Discord.MessageEmbed()
		.setTitle('Lookup Data')
		.setDescription(`Data for Order: **${data.uniqid}**`)
        .setThumbnail('https://i.ibb.co/fnGjLXc/bb545da78ff3a7d3db5466819642bb62.png')
		.addFields(
			{ name: 'Product: ', value: `${data.product_title} (${data.product_id})`, inline: true },
			{ name: 'Quantity: ', value: `${data.quantity} ($${data.total})`, inline: true },
		)
        .addField('\u200B', '\u200B', true)
        .addFields(
			{ name: 'Email: ', value: data.customer_email, inline: true },
			{ name: 'Date: ', value: (macros.displayDate(data.created_at)), inline: true },
		)
		.addField('\u200B', '\u200B', true)
		.addFields(
            { name: 'Status: ', value: data.status, inline: true },
			{ name: 'Gateway: ', value: data.gateway, inline: true },
		)
        .addField('\u200B', '\u200B', true)
		.addFields(
			{ name: 'Type: ', value: data.product_type, inline: true },
			{ name: `${data.product_type}`, value: (data.product_type==="SERIALS")?((data.serials[0])?data.serials[0]:'nil'):data.file_attachment_uniqid, inline: true },
		)
        .addField('\u200B', '\u200B', true)
		.setTimestamp()
		.setColor('#00ff3c');
	return dataEmbed;
}

function Product(data) {
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

function Query(data) {
	const dataEmbed = new Discord.MessageEmbed()
		.setTitle('Lookup Query')
		.setDescription(`Data for Query: **${data.uniqid}**`)
        .setThumbnail('https://i.ibb.co/fnGjLXc/bb545da78ff3a7d3db5466819642bb62.png')
		.addFields(
			{ name: 'Title: ', value: `${data.title}`, inline: true },
			{ name: 'Customer Email: ', value: `${data.customer_email}`, inline: true },
		)
        .addField('\u200b','\u200b',true);
        data.messages.forEach(o=>{
            dataEmbed.addField(`${o.role} ${macros.displayTime(o.created_at)}`,o.message,false);
        })
		dataEmbed.setTimestamp()
		dataEmbed.setColor('#00ff3c');

	return dataEmbed;
}

function Feedback(data) {
	const dataEmbed = new Discord.MessageEmbed()
		.setTitle('Lookup Feedback')
		.setDescription(`Data for Feedback: **${data.uniqid}**`)
        .setThumbnail('https://i.ibb.co/fnGjLXc/bb545da78ff3a7d3db5466819642bb62.png')
		.addFields(
			{ name: 'Customer Invoice: ', value: `${data.invoice_id}`, inline: true },
			{ name: 'Product: ', value: `${data.product_title}`, inline: true },
		)
        .addField('\u200B', '\u200B', true)
        .addFields(
			{ name: 'Feedback: ', value: data.message, inline: true },
            { name: 'Reply: ', value: data.reply?data.reply:"NONE",inline: false},
			{ name: 'Score: ', value: `${data.score}/5`,inline: false},
		)
		.setTimestamp()
		.setColor('#00ff3c');

	return dataEmbed;
}

module.exports = { 
    Order:Order,
    Feedback:Feedback,
    Query:Query,
    Product:Product
}