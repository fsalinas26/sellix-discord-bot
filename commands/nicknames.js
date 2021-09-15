const Sellix = require('sellix-api-wrapper');
const config = require('../config.json');
const fs = require('fs');
const embed = require('../embeds/Commands/embeds')
module.exports = {
    name: "nickname",
    guildOnly: false,
    adminOnly: true,
    async execute(message,args){
        const input = args[0];
        switch(input)
        {
            case 'add':
                if(args.length<2)return message.reply("Format is **?nickname add [nickname] [productid]**");
                let obj = {};
                obj[args[1]] = args[2];
                config.nicknames = {...config.nicknames,...obj};
                fs.writeFile('./config.json',JSON.stringify(config,null,' \t'),function(err,data){
                    const embed_out = embed.AddNickname(args[1],args[2]);
                    return message.channel.send(embed_out); 
                });
                break;
            case 'delete':
                if(!args[1]) return message.reply("Missing Product Nickname!");
                delete config.nicknames[args[1]];
                fs.writeFile('./config.json',JSON.stringify(config,null,' \t'),function(err,data){
                    const embed_out = embed.RemoveNickname(args[1])
                    return message.channel.send(embed_out); 
                });
                break;
            case 'all':
                let map = [];
                for(const [key,value] of Object.entries(config.nicknames))
		            {map.push({nickname: key, productid: value});}
                const embed_out = embed.AllNicknames(map);
                return message.channel.send(embed_out); 
                break;
            default:
                break;
        }
    }
}