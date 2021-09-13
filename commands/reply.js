const Sellix = require('sellix-api-wrapper');
const config = require('../config.json');
const API = new Sellix.API(config.sellix_auth);
const Discord = require('discord.js');
const embeds = require('../embeds')
const fs = require('fs');


let months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
function displayDate(time)
{
    let day = new Date(time*1000);
    var str_out = "";
    str_out+= `${months[day.getMonth()]} ${day.getDate()} at ${day.getHours()%12}:${day.getMinutes()} ${day.getHours() < 12 ? "AM":"PM"}`
    return str_out;
}

function displayTime(time)
{
    let day = new Date(time*1000);
    var str_out = "";
    str_out+= `${day.getHours()%12}:${day.getMinutes()} ${day.getHours() < 12 ? "AM":"PM"}`
    return str_out;
}

function embedFeedback(data) {
	const dataEmbed = new Discord.MessageEmbed()
		.setTitle('Feedback Reply')
		.setDescription(`Data for Feedback: **${data.uniqid}**`)
        .setThumbnail('https://cdn.sellix.io/static/logo/single-less-border.png')
        .addFields(
			{ name: 'Feedback: ', value: data.message, inline: true },
            { name: 'Reply: ', value: data.reply?data.reply:"NONE",inline: false},
		)
		.setTimestamp()
		.setColor('#00ff3c');

	return dataEmbed;
}

function embedQuery(data) {
	const dataEmbed = new Discord.MessageEmbed()
		.setTitle('Lookup Query')
		.setDescription(`Data for Query: **${data.uniqid}**`)
        .setThumbnail('https://cdn.sellix.io/static/logo/single-less-border.png')
        data.messages.forEach(o=>{
            dataEmbed.addField(`${o.role} ${displayTime(o.created_at)}`,o.message,false);
        })
		dataEmbed.setTimestamp()
		dataEmbed.setColor('#00ff3c');

	return dataEmbed;
}

module.exports = {
    name: "reply",
    guildOnly: false,
    adminOnly: true,
    execute(message,args){
        const input = args[0];
        if(args[1] && config.nicknames)
        {   if(config.nicknames[args[1]])
                args[1] = config.nicknames[args[1]]
        }
        switch(input)
        {
            case 'feedback':
                if(!args[1]) return message.reply("Missing Feedback ID!");
                if(!args[2]) return message.reply("Missing Reply");
                var reply = (args.slice(2)).join(' ');
                API.replyFeedback(args[1],reply).then(data=>{
                        message.reply(data.message);
                    API.getFeedback(args[1]).then(data=>{
                        data = data.data.feedback;
                        const feedbackEmbed = embedFeedback(data);
                        return message.reply(feedbackEmbed);
                    })
                }).catch(err=>{
                    console.log(err.message);
                    return message.reply(err.message);
                })
                
                break;
            case 'query':
                if(!args[1]) return message.reply("Missing Query ID!");
                if(!args[2]) return message.reply("Missing Reply");
                var reply = (args.slice(2)).join(' ');
                API.replyQuery(args[1],reply).then(data=>{
                    message.reply(data.message);
                    API.getQuery(args[1]).then(data=>{
                        data = data.data.query;
                        const queryEmbed = embedQuery(data);
                        return message.reply(queryEmbed);
                    })
                }).catch(err=>{
                    console.log(err.message);
                    return message.reply(err.message);
                })
                break;
            default:
                var reply = (args.slice(0)).join(' ');
                API.getAllFeedback().then(data=>{
                    if(data.data)
                    {
                        const feedbackID = data.data.feedback[0].uniqid;
                        API.replyFeedback(feedbackID,reply).then(res=>{
                            message.reply(res.message);
                            API.getFeedback(feedbackID).then(data=>{
                                if(data.data)
                                {
                                const feedbackEmbed = embedFeedback(data.data.feedback);
                                return message.reply(feedbackEmbed);
                                }else{
                                    throw Error('Error replying to feedback')
                                }
                            })
                        })
                    }else{
                        throw Error('Error Fetching Feedback')
                    }
                })
                break;
        }
    }
}