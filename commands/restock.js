const Sellix = require('sellix-api-wrapper');
const config = require('../config.json');
const API = new Sellix.API(config.sellix_auth);
const Discord = require('discord.js');


function embedRestock(res,product_data,serials) {
    var msg = "";
    serials.forEach(serial=>msg+=`${serial}\n`);
	const dataEmbed = new Discord.MessageEmbed()
		.setTitle('Product Restock')
		.setDescription(`Restocked Product: **${res.data.uniqid}**`)
        .setThumbnail('https://i.ibb.co/fnGjLXc/bb545da78ff3a7d3db5466819642bb62.png')
		.addFields(
			{ name: 'Product: ', value: product_data.title, inline: true },
            { name: 'Total Stock: ', value: `${product_data.stock+serials.length}`, inline: true },
		)
        .addField('\u200B','\u200B',true)
        .addFields(
			{ name: 'Response: ', value: res.message, inline: true },
		)
        .addField('\u200B','\u200B',true)
        .addFields(
			{ name: `Added Serials (${serials.length}): `, value: msg, inline: false }
		)
		.setTimestamp()
		.setColor('#00ff3c');

	return dataEmbed;
}
module.exports = {
    name: "restock",
    guildOnly: false,
    adminOnly: true,
    execute(message,args){
        if(!args.length)return message.reply('Format is **?restock [product] [serials (comma-seperated)]**');
        if(!args[1])return message.reply('Missing Serials (comma-seperated)');
        var serials = args.splice(1).join(' ').split(',');
        var product_id = config.nicknames[args[0]];
        if(!product_id)product_id=args[0];
        API.getProduct(product_id).then(data_p=>{
            var allSerials = serials.concat(data_p.data.product.serials);
            API.editProduct(product_id,{"serials":allSerials}).then(res=>{
              const restockEmbed = embedRestock(res,data_p.data.product,serials);
              return message.reply(restockEmbed);
            });
    }).catch(err=>{
        console.log(err.message);
        return message.reply(err.message);
    })
    }
}