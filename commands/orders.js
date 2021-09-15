const Sellix = require('sellix-api-wrapper');
const config = require('../config.json');
const API = new Sellix.API(config.sellix_auth);
const Discord = require('discord.js');
const macros = require('./macros.js')

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
        dataEmbed.addField(`Order ${order.uniqid}`,`\`\`\`Product: ${order.product_title}\nGateway: ${order.gateway} (${order.status})\nEmail: ${order.customer_email}\n${macros.displayDate(order.created_at)}\`\`\``)
    });
	return dataEmbed;
}

function filterOrders(filter,orders)
{
    let filteredOrders = [];
    for(var [key,value] of Object.entries(orders))
    {
        if(value.status == filter)
            filteredOrders.push(value);
    }
    return filteredOrders;
}

module.exports = {
    name: "orders",
    guildOnly: false,
    adminOnly: true,
    execute(message,args){
        API.getAllOrders().then(data=>{
            var orders = data.data.orders;
            if(args[0])
                orders = filterOrders(args[0],orders)
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