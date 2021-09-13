const Discord = require('discord.js');
const macros = require('./macros');

module.exports = {
    name: 'order:paid',
    execute(data){
        const embed = new Discord.MessageEmbed()
        .setTitle('You Made a New Sale')
        .setURL(`https://dashboard.sellix.io/invoices/${data.uniqid}`)
        .setDescription('One of your products has been bought!')
        .setThumbnail('https://cdn.sellix.io/static/logo/single-less-border.png')
        .addFields(
            {name: "Invoice", value: data.uniqid},
            {name: "Gateway", value: data.gateway,inline:true},
            {name: "Product", value: data.product_title,inline:true},
            {name: 'Quantity', value: data.quantity, inline:true},
            {name: "Total", value: data.total,inline: true},
            {name: 'Customer Email',value: data.customer_email,inline:true},
            {name: 'Customer IP', value: data.ip,inline:true},
            {name: 'Customer Location', value: data.location,inline:true},
            {name: 'Customer User Agent', value: data.user_agent,inline:true},
            {name: 'Country Code', value: data.ip_info.country_code,inline:true},
            {name: 'Fraud Detection ID', value: data.ip_info.request_id,inline:true},
            {name: 'Fraud Score', value: `${data.ip_info}/100`.fraud_score,inline:true},
            {name: 'ISP', value: data.ip_info.isp, inline:true},
            {name: 'Connection Type', value: data.ip_info.connection_type, inline: true},
            {name: 'Abuse Velocity', value: data.ip_info.abuse_velocity, inline:true},
            {name: 'Mobile', value: data.ip_info.mobile, inline:true},
            {name: 'Proxy', value: data.ip_info.proxy, inline:true},
            {name: 'VPN', value: data.ip_info.vpn, inline:true},
            {name: 'TOR', value: data.ip_info.tor, inline:true},
            {name: 'Date', value: macros.displayDate(data.created_at),inline:false}
        )
        .setFooter('This is an automatic Webhook notification from Sellix.io Discord Bot')
        .setTimestamp();
        return embed;        
    }
}