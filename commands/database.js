const embed = require('../embeds/Commands/embeds');
const macros = require('./macros');
const config = require('../config.json')
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
		}else{
      return mention;
    }
}

module.exports = {
    name: 'database',
    guildOnly: false,
    adminOnly: true,
    execute(message,args,db){
        const input = args[0];
        const role = message.member.guild.roles.cache.get(config.role_to_give)
        if(args[1]) args[1] = isMention(args[1]);
        if(args[2]) args[2] = isMention(args[2]);
        db.serialize(function(){
            switch(input)
            {
                case 'all':
                    let users = [];
                    db.each('SELECT * FROM Users',function(err,row){
                        row.RedeemedOn = macros.displayDate(row.RedeemedOn);
                        users.push(row);
                    },(err,res)=>{
                        const embed_out = embed.AllEntries(users);
                        return message.channel.send(embed_out);
                    })
                    break;
                case 'refresh':
                    let expiredUsers = [];
                    db.each('SELECT * FROM Users',function(err,row){
                        if(row.Expiry/1000 < new Date().getTime())
                            expiredUsers.push(row);
                    },(err,res)=>{
                        expiredUsers.map(obj=>{
                            message.guild.members.cache.get(obj.DiscordID).roles.remove(role);
                        })
                        const embed_out = embed.AllExpired(expiredUsers);
                        return message.channel.send(embed_out);
                    })
                    break;
                default:
                db.get("SELECT * FROM Users WHERE OrderID = ? OR DiscordID = ?",[args[1],args[1]],function(err,row){
                    if(!row)return message.reply('No entry found in database');
                    else if(err) return message.reply(err);
                    switch(input)
                    {
                        case 'find':
                            const embed_out = embed.DatabaseEntry(row);
                            return message.channel.send(embed_out);
                            break;
                        case 'delete':
                            db.run("DELETE FROM Users WHERE OrderID = ? OR DiscordID = ?",[args[1],args[1]],function(err){
                                message.guild.members.cache.get(row.DiscordID).roles.remove(role).then(res=>{
                                    return message.reply('Entry deleted from database and roles removed from user');
                                }).catch(err=>{
                                    return message.reply(err.message);
                                })
                            });
                            break;
                        case 'expire':
                            var expiryDate = macros.expiryDate(parseInt(args[2]))
                            db.run("UPDATE Users SET Expiry = ? WHERE OrderID = ? OR DiscordID = ?",[expiryDate,args[1],args[1]],function(err)
                            {
                                message.channel.send(`<@${row.DiscordID}> roles will expire in ${args[2]} days on ${macros.displayDate(expiryDate)}`)
                                db.get("SELECT * FROM Users WHERE OrderID = ? OR DiscordID = ?",[args[1],args[1]],function(err,row){
                                    const embed_out = embed.DatabaseEntry(row);
                                    return message.channel.send(embed_out);
                                })
                            })
                            break;
                        case 'set':
                            db.run("UPDATE Users SET DiscordID = ? WHERE OrderID = ?",[args[2],args[1]],function(err){
                                message.reply('Updated entry in database...');
                                db.get("SELECT * FROM Users WHERE OrderID = ?",[args[1]],function(err,row){
                                    const embed_out = embed.DatabaseEntry(row);
                                    return message.channel.send(embed_out);
                                })
                            });
                            break;
                        default:
                            break;
                    }
                })
                break;
            }
        })
    }
}