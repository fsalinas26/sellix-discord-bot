const Sellix = require('sellix-api-wrapper');
const config = require('../config.json');
const API = new Sellix.API(config.sellix_auth);
const Discord = require('discord.js');

function embedFeedback(data, index)
{
    const current = data.slice(index, index + 5);
	const dataEmbed = new Discord.MessageEmbed()
		.setTitle('List of Feedback')
        .setThumbnail('https://cdn.sellix.io/static/logo/single-less-border.png')
		.setTimestamp()
		.setColor('#00ff3c')
		.setDescription(`Displaying ${index + 1}-${index + current.length} out of ${data.length} Feedbacks`);
	current.forEach(query =>{
        dataEmbed.addField(`Feedback ${query.uniqid} `,`\`\`\`Message: ${query.message}\nReply: ${query.reply?query.reply:"NONE"}\`\`\``)
    });
	return dataEmbed;
}
function filterFeedback(feedback)
{
    let filteredFeedback = [];
    for(var [key,value] of Object.entries(feedback))
    {
        if(!value.reply)
            filteredFeedback.push(value);
    }
    return filteredFeedback;
}
module.exports = {
    name: "feedback",
    guildOnly: false,
    adminOnly: true,
    execute(message,args){
        
        API.getAllFeedback().then(data=>{
            var feedback = data.data.feedback;
            if(args[0]==="filter")
            {
                feedback = filterFeedback(feedback);
            }
            message.reply(embedFeedback(feedback, 0)).then(msg => {
                if (feedback.length <= 5) return;
                msg.react('➡️');
                const reactCollector = msg.createReactionCollector(
                    (reaction, user) => ['⬅️', '➡️'].includes(reaction.emoji.name) && user.id === message.author.id,
                    { time: 60000 }, // timeout
                );
                let curIndex = 0;
                reactCollector.on('collect', reaction => {
                    msg.reactions.removeAll().then(async () => {
                        reaction.emoji.name === '⬅️' ? curIndex -= 5 : curIndex += 5;
                        msg.edit(embedFeedback(feedback, curIndex));
                        if (curIndex !== 0) await msg.react('⬅️');
                        if (curIndex + 5 < feedback.length) msg.react('➡️');
                    });
                });
            });
        }).catch(err=>{
            console.log(err.message);
            return message.reply(err.message);
        })
    }
}