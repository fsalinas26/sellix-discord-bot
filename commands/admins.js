const config = require('../config.json')
const embeds = require('../embeds/Commands/embeds')
const fs = require('fs')

function isMention(mention)
{
    if (mention.startsWith('<@') && mention.endsWith('>')) 
		{
			mention = mention.slice(2, -1); 
			if (mention.startsWith('!')) 
			{
				mention = mention.slice(1);
			}
			return mention
		}
}

module.exports = {
    name: "admin", 
    guildOnly: false, 
    adminOnly: true, 
    execute(message,args)
    {
        const input = args[0]; 
        switch(input)
        {
            case 'add':
                if(!args[1])return message.reply('Format is ?admin add @UserToAdd');
                var DiscordID = isMention(args[1]);
                var adminIndex = config.admins.indexOf(DiscordID);
                if(adminIndex!=-1)return message.reply('This user is already an Admin!')
                config.admins.push(DiscordID);
                fs.writeFile('./config.json',JSON.stringify(config,null,' \t'),function(err,data){
                    return message.channel.send(`<@${DiscordID}> now has access to admin commands`);
                });
                break;
            case 'remove':
                if(!args[1])return message.reply('Format is ?admin remove @UserToAdd');
                var DiscordID = isMention(args[1]);
                var adminIndex = config.admins.indexOf(DiscordID);
                if(adminIndex===-1)return message.reply('No Admin Found');
                config.admins.splice(adminIndex,1);
                fs.writeFile('./config.json',JSON.stringify(config,null,' \t'),function(err,data){
                    return message.channel.send(`<@${DiscordID}> no longer has access to admin commands`);
                });
                break;
            case 'all':
                const admin_embed = embeds.ShowAdmins(config.admins);
                return message.channel.send(admin_embed);
                break;
            default: 
                break;  
        }
    }
}