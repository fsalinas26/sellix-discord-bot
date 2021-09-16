const Sellix = require('sellix-api-wrapper');
const config = require('../config.json');
const API = new Sellix.API(config.sellix_auth);
const embeds = require('../embeds/Commands/embeds.js')
const macros = require('./macros.js');
const query1 = `SELECT * FROM Users WHERE OrderID = ?`;
const query2 = `INSERT INTO Users(OrderID, DiscordID, RedeemedOn, Expiry) VALUES (?,?,?,?)`

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
    name: "redeem",
    guildOnly: true,
    adminOnly: false,
    execute(message,args,db){
        if(!args.length)return message.reply('Format is **?redeem [OrderID]**')
        const OrderID = args[0];
        const DiscordID = args[1]?isMention(args[1]):message.author.id;
        const DateRedeemed = new Date().getTime()/1000;
        API.getOrder(OrderID).then(data=>{
            try{
            if(!data.data)throw Error('No Order Data Found!');
            data = data.data.order;
            if(data.status != "COMPLETED")return message.reply(`Order is not completed. Status is **${data.status}**`);
            db.serialize(function(){
                db.get(query1,[OrderID],function (err,row){
                        if(row)return message.reply('License already redeemed!');
                        var expiryDate = macros.expiryDate(30);
                        db.run(query2,[OrderID,DiscordID,DateRedeemed,expiryDate],(err)=>{
                        },(err)=>{
                            if(err)return message.reply(err.message)
                            const role = message.member.guild.roles.cache.get(config.role_to_give)
                            message.guild.members.cache.get(DiscordID).roles.add(role);
                            const redeemEmbed = embeds.OrderRedeem(OrderID,DiscordID,macros.displayDate(DateRedeemed),macros.displayDate(expiryDate));
                            return message.channel.send(redeemEmbed);
                            })
                    });
            })
            }catch(err){
                return message.reply(err.message);
            }
        })
    }
}