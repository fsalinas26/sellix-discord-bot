# Sellix Discord Bot
A Complete Sellix.io Discord Bot using my [API wrapper](https://github.com/fsalinas26/sellix-api-wrapper)  
<p align="center">
  <img src="https://i.gyazo.com/0943bf2926d9221f493fe2b6785080f6.png">
</p>

* [Config.json](https://github.com/fsalinas26/sellix-discord-bot#config.json)
* [Commands](https://github.com/fsalinas26/sellix-discord-bot#commands)
* [Webhooks](https://github.com/fsalinas26/sellix-discord-bot#sellix-webhooks)
* [SQLite Database](https://github.com/fsalinas26/sellix-discord-bot#database)

# Requirements
* Sellix.io API Key
* Discord Bot Token ([How To Make A Discord Bot](https://www.section.io/engineering-education/discord-bot-node/))
* NodeJS v12.0.0^


# Installation/Quickstart
```
git clone https://github.com/fsalinas26/sellix-discord-bot  
cd ./sellix-discord-bot  
npm install  
npm run setup //run this script to initialize your config.json using CLI  
node index.js  
```


# Config.json  
You can run the command **npm run setup** or **node config.js** to initialize your config.json file.  
```js
{
 	"token": "YOUR_DISCORD_BOT_TOKEN",
 	"sellix_auth": "YOUR_SELLIX_API_KEY",
 	"prefix": "?", //Command prefix for the bot to listen for
 	"admins": [ //List of DiscordID's that have access to admin commands
 	 	"648190333849104912",
 	 	"383010848124910275"
 	],
 	"webhook_channels": { //Use set command to set webhook-specific channels
 	 	"default": "884192017828910293" //Default ChannelID to route all webhook events
   },
 	"role_to_give": "887571247850999878", //The Discord RoleID to grant users when they redeem a completed order.
 	"nicknames": { //Product Nicknames for easier reference
 	 	"demoNickname": "60c54fa7bc1ff"
 	}
}
```


# Commands

## ?lookup order/product/email/query/feedback [id]
Retrieves an order, product, query, or feedback from your shop.  
**Usage:**  
```
?lookup order 3c23df-6cgdf6fG13-194126  
?lookup email customerEmail@gmail.com  
?lookup product 60b54556886dd  
```

## ?redeem [OrderID]
Checks if the order is completed and gives a role to the message author and adds a table entry to the [SQLite Database](https://github.com/fsalinas26/sellix-discord-bot#database). Orders can only be redeemed once. Set *role_to_give* in config.json.  
**Usage:**  
```
?redeem 3c23df-6cgdf6fG13-194126
?redeem 3c23df-6cgdf6fG13-194126 @DemoUser //Redeem an order for someone else
```

## ?restock [productid/nickname] [serials]
Restocks a product on your website by updating its serials.  
**Usage:**  
```
?restock 6ab37fif7e9 A8FJ1LI, FEBURLAO, C3L1F8A0, G8LA1L3JF  //Use comma-seperated list for serials  
?restock demo_nickname A8FJ1LI, FEBURLAO, C3L1F8A0, G8LA1L3JF //See below for adding product nicknames
```


## ?reply query/feedback [id] [reply] 
Replies to a query or feedback by id.  
**Usage:**
```
?reply query 15bd56-18c3475d4c-c906ed  Everything all set?
?reply feedback 82fh9c-a0a5ghf3da-hj01a2 Thanks for the feedback!
?reply q Everything all set?      //replies to the most recent query
?reply f Thanks for the feedback! //replies to the most recent feedback
```

## ?products  
Retrieves all products and sends an iterable Discord embed.

## ?orders  
Retrieves all orders and sends an iterable Discord embed.  

## ?queries  
Retrieves all queries and sends an iterable Discord embed.

## ?feedback  
Retrieves all feedback and sends an iterable Discord embed.

## ?admin add/remove/all [DiscordID]
Grant or revoke access to admin commands for a specific user  
**Usage:**  
```
?admin add @cisco
?admin remove @cisco
?admin all //Displays all admins
```

## ?nickname add/delete/all [Nickname] [ProductID] 
Sets a nickname for a specific product ID in **config.json**  
**Usage:**
```
?nickname add demo_nickname 6ab37fif7e9 // ProductID 6ab37fif7e9 can now be referenced using 'demo_nickname'
?nickname delete demo_nickname // Deletes 'demo_nickname' from nicknames
?nickname all // Shows all nicknames
```

## ?set [WebhookEvent]  
Sets the current channel to receive a specific webhook.  
*See below for webhook events.*  
**Usage:**
```
?set order:paid //Sets current channel to receive all order:paid webhooks
?set feedback:received //Sets current channel to receive all feedback:received webhooks
```


# Sellix Webhooks  
There is an embeded express app to receive webhooks from Sellix.io, all you have to do is set it up on your shop. The default port for the webhook is 3000, and all webhook request should be forwarded to your server address (where the bot is hosted) with the */hook* endpoint  
[Add Sellix Webhook Endpoint](https://dashboard.sellix.io/developer/webhooks/all)  
<img width="40%" height="40%" src="https://i.gyazo.com/b73509330ed011f94e1a03e9be34902e.png">

Current supported webhook events are **order:paid**, **feedback:received**, **query:created**, **query:replied**, **product:stock**, **order:disputed**  
[See here for more info on Sellix Webhooks](https://developers.sellix.io/documentation#webhooks)  

# Database
When an OrderID is [redeemed](https://github.com/fsalinas26/sellix-discord-bot#redeem-orderid), the user will be given the role specified in config.json (*role_to_give*). A new table entry will also be inserted into the SQLite Database containing the OrderID, DiscordID, Date Redeemed, and Expiry Date. *The Expiry Date is by default set to 30 days from when the invoice was redeemed.* However, you can manually set a users expiry date using the *?database expire* command below.  
## ?database find/remove/set/expire/refresh/all [DiscordID/OrderID]  
**Usage**  
```
?database find @cisco //Find a table entry by DiscordID 
?database find 3c23df-6cgdf6fG13-194126 //Find a table entry by OrderID
?database remove 3c23df-6cgdf6fG13-194126 //Removes table entry from database by OrderID
?database all //Displays All Table Entries
?database refresh //Remove roles from all expired database entries
?database expire @cisco 15//Sets expiry date for table entry to 15 days from current day.
```

