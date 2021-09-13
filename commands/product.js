const Sellix = require('sellix-api-wrapper');
const config = require('../config.json');
const API = new Sellix.API(config.sellix_auth);
const Discord = require('discord.js');

function embedProducts(data, index)
{
    const current = data.slice(index, index + 5);
	const dataEmbed = new Discord.MessageEmbed()
		.setTitle('List of Products')
        .setThumbnail('https://cdn.sellix.io/static/logo/single-less-border.png')
		.setTimestamp()
		.setColor('#00ff3c')
		.setDescription(`Displaying ${index + 1}-${index + current.length} out of ${data.length} products`);
	current.forEach(product =>{
        dataEmbed.addField(`${product.title} `,`\`\`\`ID: ${product.uniqid}\nPrice: $${product.price}\nStock: ${product.stock}\`\`\``)
    });
	return dataEmbed;
}

module.exports = {
    name: "products",
    guildOnly: false,
    adminOnly: true,
    execute(message,args){
        API.getAllProducts().then(data=>{
            const products = data.data.products;
            message.reply(embedProducts(products, 0)).then(msg => {
                if (products.length <= 5) return;
                msg.react('➡️');
                const reactCollector = msg.createReactionCollector(
                    (reaction, user) => ['⬅️', '➡️'].includes(reaction.emoji.name) && user.id === message.author.id,
                    { time: 60000 }, // timeout
                );
                let curIndex = 0;
                reactCollector.on('collect', reaction => {
                    msg.reactions.removeAll().then(async () => {
                        reaction.emoji.name === '⬅️' ? curIndex -= 5 : curIndex += 5;
                        msg.edit(embedProducts(products, curIndex));
                        if (curIndex !== 0) await msg.react('⬅️');
                        if (curIndex + 5 < products.length) msg.react('➡️');
                    });
                });
            });
        }).catch(err=>{
            console.log(err.message);
            return message.reply(err.message);
        })
    }
}