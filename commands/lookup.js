const Sellix = require('sellix-api-wrapper');
const config = require('../config.json');
const API = new Sellix.API(config.sellix_auth);
const embed = require('../embeds/Commands/embeds.js')

module.exports = {
    name: "lookup",
    guildOnly: false,
    adminOnly: true,
    execute(message,args,db){
        if(!args.length)return message.reply('Format is **?lookup [type] [id]**')
        const input = args[0];
        switch(input)
        {
            case 'order':
                if(!args[1])return message.reply('Missing Order ID!')
                API.getOrder(args[1]).then(data=>{
                    if(data.data)
                    {   const orderEmbed = embed.Order(data.data.order);
                        return message.reply(orderEmbed);
                    }else{
                        throw Error('No Order Found')
                    }
                }).catch(err=>{
                        console.log(err.message);
                        return message.reply(err.message);
                })
                
                break;
            case 'product':
                if(!args[1])return message.reply('Missing Product ID!')
                API.getProduct(args[1]).then(data=>{
                    if(data.data)
                    {   const productEmbed = embed.Product(data.data.product);
                        return message.reply(productEmbed);
                    }else{
                        throw Error('No Product Found')
                    }
                }).catch(err=>{
                        console.log(err.message);
                        return message.reply(err.message);
                })

                break;
            case 'query':
                if(!args[1])return message.reply('Missing Query ID!')
                API.getQuery(args[1]).then(data=>{
                    if(data.data)
                    {   const queryEmbed = embed.Query(data.data.query);
                        return message.reply(queryEmbed);

                    }else{
                        throw Error('No Query Found')
                    }
                }).catch(err=>{
                        console.log(err.message);
                        return message.reply(err.message);
                })

                break;
            case 'feedback':
                if(!args[1])return message.reply('Missing Feedback ID!')
                API.getFeedback(args[1]).then(data=>{
                    if(data.data)
                    {   const feedbackEmbed = embed.Feedback(data.data.feedback);
                        return message.reply(feedbackEmbed);
                    }else{
                        throw Error('No Feedback Found');
                    }
                }).catch(err=>{
                        console.log(err.message);
                        return message.reply(err.message);
                })

                break;
            case 'email':
                API.getAllOrders().then(data=>{
                    let orderArr = [];
                    for(obj of data.data.orders)
                        orderArr.push(obj);
                    var order = orderArr.find(o=>o.customer_email === args[1]);
                    API.getOrder(order.uniqid).then(data=>{
                        if(data.data)
                        {   const orderEmbed = embed.Order(data.data.order);
                            return message.reply(orderEmbed);
                        }else{
                            throw Error(`No Order Found for ${args[1]}`)
                        }
                    })
                }).catch(err=>{
                        console.log(err.message);
                        return message.reply(err.message);
                })
                break;
            default:
                break;
        }
    }
}