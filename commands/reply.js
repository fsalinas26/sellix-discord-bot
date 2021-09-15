const Sellix = require('sellix-api-wrapper');
const config = require('../config.json');
const API = new Sellix.API(config.sellix_auth);
const embeds = require('../embeds/Commands/embeds.js')

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
                try
                {
                if(!args[1]) return message.reply("Missing Feedback ID!");
                if(!args[2]) return message.reply("Missing Reply");
                var reply = (args.slice(2)).join(' ');
                API.replyFeedback(args[1],reply).then(data=>{
                    if(data.error)return message.reply(data.error);
                    message.reply(data.message);
                    API.getFeedback(args[1]).then(data=>{
                        if(data.error)return message.reply(data.error);
                        data = data.data.feedback;
                        const feedbackEmbed = embeds.FeedbackReply(data);
                        return message.reply(feedbackEmbed);
                    })
                })
                }catch(err){
                    return message.reply(err.message);
                }
            break;
            case 'query':
                try
                {
                if(!args[1]) return message.reply("Missing Query ID!");
                if(!args[2]) return message.reply("Missing Reply");
                var reply = (args.slice(2)).join(' ');
                API.replyQuery(args[1],reply).then(data=>{
                    if(data.error)return message.reply(data.error);
                    message.reply(data.message);
                    API.getQuery(args[1]).then(data=>{
                        console.log(data);
                        if(data.error)return message.reply(data.error);
                        data = data.data.query;
                        const queryEmbed = embeds.QueryReply(data);
                        return message.reply(queryEmbed);
                    })
                })
                }catch(err){
                    return message.reply(err.message);
                }
            break;
            case 'f':
                    try
                    {
                    var reply = (args.slice(1)).join(' ');
                    API.getAllFeedback().then(data=>{
                        if(data.error)throw Error(data.error);
                        const feedbackID = data.data.feedback[0].uniqid;
                        API.replyFeedback(feedbackID,reply).then(data=>{
                            if(data.error)return message.reply(data.error);
                            message.reply(data.message);
                            API.getFeedback(feedbackID).then(data=>{
                                if(data.error)return message.reply(data.error);
                                const feedbackEmbed = embeds.FeedbackReply(data.data.feedback);
                                return message.reply(feedbackEmbed);
                            })
                        })
                    })
                    }catch(err){
                        return message.reply(err.message);
                    }
                break;
                case 'q':
                    try
                    {
                        var reply = (args.slice(1)).join(' ');
                        API.getAllQueries().then(data=>{
                                if(data.error)return message.reply(data.error);
                                const queryID = data.data.queries[0].uniqid;
                                API.replyQuery(queryID,reply).then(res=>{
                                    message.reply(res.message);
                                    API.getQuery(queryID).then(data=>{
                                        if(data.error)return message.reply(data.error);
                                        const queryEmbed = embeds.QueryReply(data.data.query);
                                        return message.reply(queryEmbed);
                                    })
                            })
                        })   
                    }catch(err)
                    {
                        return message.reply(err.message);
                    }
                break;
                default:
                    break;
        }
    }
}