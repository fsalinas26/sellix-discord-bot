const Sellix = require('sellix-api-wrapper');
const config = require('../config.json');
const API = new Sellix.API(config.sellix_auth);
const Discord = require('discord.js');

function embedOrder(data, index)
{
    const current = data.slice(index, index + 5);
	const dataEmbed = new Discord.MessageEmbed()
		.setTitle('List of Orders')
        .setThumbnail('https://cdn.sellix.io/static/logo/single-less-border.png')
		.setTimestamp()
		.setColor('#00ff3c')
		.setDescription(`Displaying ${index + 1}-${index + current.length} out of ${data.length} orders`);
	current.forEach(order =>{
        dataEmbed.addField(`Order: ${order.uniqid} `,`Product: ${order.product_title}\nGateway: ${order.gateway}\nStatus: ${order.status}\nCustomer Email: ${order.customer_email}`)
    });
	return dataEmbed;
}

module.exports = {
    name: "orders",
    guildOnly: false,
    adminOnly: true,
    execute(message,args){
        API.getAllOrders().then(data=>{
            const orders = data.data.orders;
            message.reply(embedOrder(orders, 0)).then(msg => {
                if (orders.length <= 5) return;
                msg.react('➡️');
                const reactCollector = msg.createReactionCollector(
                    (reaction, user) => ['⬅️', '➡️'].includes(reaction.emoji.name) && user.id === message.author.id,
                    { time: 60000 }, // timeout
                );
                let curIndex = 0;
                reactCollector.on('collect', reaction => {
                    msg.reactions.removeAll().then(async () => {
                        reaction.emoji.name === '⬅️' ? curIndex -= 5 : curIndex += 5;
                        msg.edit(embedOrder(orders, curIndex));
                        if (curIndex !== 0) await msg.react('⬅️');
                        if (curIndex + 5 < orders.length) msg.react('➡️');
                    });
                });
            });
        }).catch(err=>{
            console.log(err.message);
            return message.reply(err.message);
        })
    }
}