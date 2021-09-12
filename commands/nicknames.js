const Sellix = require('sellix-api-wrapper');
const config = require('../config.json');
const API = new Sellix.API(config.sellix_auth);
const Discord = require('discord.js');
const fs = require('fs');

module.exports = {
    name: "nickname",
    guildOnly: false,
    adminOnly: true,
    execute(message,args){
        const input = args[0];
        switch(input)
        {
            case 'add':
                if(args.length<2)return message.reply("Format is **?nickname add [nickname] [productid]**");
                let obj = {};
                obj[args[1]] = args[2];
                config.nicknames = {...config.nicknames,...obj};
                console.log(config);
                fs.writeFile('./config.json',JSON.stringify(config),function(err,data){
                    return message.reply(`Added product nickname to **config.json**\`\`\`Nickname: ${args[1]}\nProduct ID: ${args[2]}\`\`\``);
                });
                break;
            case 'delete':
                if(!args[1]) return message.reply("Missing Product Nickname!");
                delete config.nicknames[args[1]];
                console.log(config);
                fs.writeFile('./config.json',JSON.stringify(config),function(err,data){
                    return message.reply(`Deleted nickname ${args[1]}`)
                });
                break;
            case 'all':
                let str = "All Nicknames```";
                for(const [key,value] of Object.entries(config.nicknames))
                {
                    str+= `Nickname: ${key}\nProduct ID: ${value}\n\n`;
                }
                if(Object.keys(config.nicknames).length === 0) str+= "None";
                str+="```";
                return message.reply(str);
                break;
            default:
                break;
        }
    }
}