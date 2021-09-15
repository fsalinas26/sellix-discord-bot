const Sellix = require('sellix-api-wrapper');
const config = require('../config.json');
const API = new Sellix.API(config.sellix_auth);
const embeds = require('../embeds/commands/embeds')
const macros = require('./macros');
const query1 = `SELECT * FROM Users WHERE OrderID = ?`;
const query2 = `INSERT INTO Users(OrderID, DiscordID, RedeemedOn) VALUES (?,?,?)`

function isMention(string)
{
    var str_out = "null";
    if(string.startsWith('<@') && string.endsWith('>'))
    {
        str_out = string.substr(2,string.length-3);
    }
    return str_out;

}
module.exports = {
    name: "redeem",
    guildOnly: true,
    adminOnly: false,
    execute(message,args,db){
        if(!args.length)return message.reply('Format is **?redeem [orderID]**')
        const OrderID = args[0];
        const DiscordID = args[1]?isMention(args[1]):message.author.id;
        const DateRedeemed = new Date();
        API.getOrder(OrderID).then(data=>{
            try{
            if(!data.data)throw Error('No Order Data Found!');
            data = data.data.order;
            if(data.status != "COMPLETED")return message.reply(`Order is not completed. Status is **${data.status}**`);
            db.serialize(function(){
                db.get(query1,[OrderID],function (err,row){
                        if(row)return message.reply('License already redeemed!');
                        db.run(query2,[OrderID,DiscordID,DateRedeemed.getTime()/1000],(err)=>{
                        },(err)=>{
                            if(err)return message.reply(err.message)
                            const role = message.member.guild.roles.cache.get(config.role_to_give)
                            message.guild.members.cache.get(DiscordID).roles.add(role);
                            const redeemEmbed = embeds.OrderRedeem(OrderID,DiscordID,macros.displayDate(DateRedeemed));
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