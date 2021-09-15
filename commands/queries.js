const Sellix = require('sellix-api-wrapper');
const config = require('../config.json');
const API = new Sellix.API(config.sellix_auth);
const Discord = require('discord.js');
const macros = require('./macros.js');

function embedQueries(data, index)
{
    const current = data.slice(index, index + 5);
	const dataEmbed = new Discord.MessageEmbed()
		.setTitle('List of Queries')
        .setThumbnail('https://cdn.sellix.io/static/logo/single-less-border.png')
		.setTimestamp()
		.setColor('#00ff3c')
		.setDescription(`Displaying ${index + 1}-${index + current.length} out of ${data.length} queries`);
	current.forEach(query =>{
        dataEmbed.addField(`Query: ${query.uniqid} `,`\`\`\`Title: ${query.title}\nStatus: ${query.status}\n${macros.displayDate(query.created_at)}\`\`\``)
    });
	return dataEmbed;
}
function filterQueries(filter,queries)
{
    let filteredQueries = [];
    for(var [key,value] of Object.entries(queries))
    {
        if(value.status == filter)
            filteredQueries.push(value);
    }
    return filteredQueries;
}
module.exports = {
    name: "queries",
    guildOnly: false,
    adminOnly: true,
    execute(message,args){
        API.getAllQueries().then(data=>{
            var queries = data.data.queries;
            if(args[0])
                queries = filterQueries(args[0],queries);
            message.reply(embedQueries(queries, 0)).then(msg => {
                if (queries.length <= 5) return;
                msg.react('➡️');
                const reactCollector = msg.createReactionCollector(
                    (reaction, user) => ['⬅️', '➡️'].includes(reaction.emoji.name) && user.id === message.author.id,
                    { time: 60000 }, // timeout
                );
                let curIndex = 0;
                reactCollector.on('collect', reaction => {
                    msg.reactions.removeAll().then(async () => {
                        reaction.emoji.name === '⬅️' ? curIndex -= 5 : curIndex += 5;
                        msg.edit(embedQueries(queries, curIndex));
                        if (curIndex !== 0) await msg.react('⬅️');
                        if (curIndex + 5 < queries.length) msg.react('➡️');
                    });
                });
            });
        }).catch(err=>{
            console.log(err.message);
            return message.reply(err.message);
        })
    }
}