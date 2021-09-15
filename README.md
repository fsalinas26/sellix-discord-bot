# Sellix Discord Bot
Complete Sellix.io Discord Bot using my [API wrapper](https://github.com/fsalinas26/sellix-api-wrapper)  
<p align="center">
  <img src="https://i.gyazo.com/0943bf2926d9221f493fe2b6785080f6.png">
</p>

* [Commands](https://github.com/fsalinas26/sellix-discord-bot#commands)
* [Webhooks](https://github.com/fsalinas26/sellix-discord-bot#sellix-webhooks)

# Requirements
* Sellix.io API Key
* Discord Bot Token
* NodeJS v14.16.0^


# Installation/Quickstart
```
git clone https://github.com/fsalinas26/sellix-discord-bot  
cd ./sellix-discord-bot  
npm install  
npm run setup //run this script to initialize your config.json using CLI  
node index.js  
```


# Commands

## ?lookup [order/product/email/query/feedback] [id]
Retrieves an order, product, query, or feedback from your shop.  
**Usage:**  
```
?lookup order 3c23df-6cgdf6fG13-194126  
?lookup email customerEmail@gmail.com  
?lookup product 60b54556886dd  
```
<img width="50%" height="50%" src="https://i.gyazo.com/c3ddea4daff89859f4efc7e6d0d7a32a.png">

## ?redeem [OrderID]
Checks if the order is completed and gives a role to the message author and adds a table entry to the SQLite Database.  
*Set role to give in config.json*  
**Usage:**  
```
?redeem 3c23df-6cgdf6fG13-194126
?redeem 3c23df-6cgdf6fG13-194126 @DemoUser //Redeem an order for someone else
```
<img width="33%" height="33%" src="https://i.gyazo.com/fa535b39fe9d2718829376da2febce09.png">

## ?restock [productid/nickname] [serials]
Restocks a product on your website by updating its serials.  
**Usage:**  
```
?restock 6ab37fif7e9 A8FJ1LI, FEBURLAO, C3L1F8A0, G8LA1L3JF  //Use comma-seperated list for serials  
?restock demo_nickname A8FJ1LI, FEBURLAO, C3L1F8A0, G8LA1L3JF //See below for adding product nicknames
```
<img width="40%" height="40%" src="https://i.gyazo.com/35cde386f489baa4fa32f509c42fe7b4.png">


## ?reply [query/feedback] [id] [reply] 
Replies to a query or feedback by id.  
**Usage:**
```
?reply query 15bd56-18c3475d4c-c906ed  Everything all set?
?reply feedback 82fh9c-a0a5ghf3da-hj01a2 Thanks for the feedback!
?reply q Everything all set?      //replies to the most recent query
?reply f Thanks for the feedback! //replies to the most recent feedback
```
<img width="37%" height="37%" src="https://i.gyazo.com/6e7183506e234ebd7c4e5209feea0ee3.png">  

## ?products  
Retrieves all products and sends an iterable Discord embed.

## ?orders  
Retrieves all orders and sends an iterable Discord embed.  

## ?queries  
Retrieves all queries and sends an iterable Discord embed.

## ?feedback  
Retrieves all feedback and sends an iterable Discord embed.

## ?admin [add/remove/all] [DiscordTag]
Grant or revoke access to admin commands for a specific user  
**Usage:**  
```
?admin add @cisco
?admin remove @cisco
?admin all //Displays all admins
```

## ?nickname [add/delete/all] 
Sets a nickname for a specific product ID in **config.json**  
**Usage:**
```
?nickname add demo_nickname 6ab37fif7e9 // ProductID 6ab37fif7e9 can now be referenced using 'demo_nickname'
?nickname delete demo_nickname // Deletes 'demo_nickname' from nicknames
```
<img width="33%" height="33%" src="https://i.gyazo.com/62345e91e22c7d253a70c1ebf40147b7.png">

## ?set [WebhookEvent]  
Sets the current channel to receive a specific webhook.  
*See below for webhook events.*  
**Usage:**
```
?set order:paid //Sets current channel to receive all order:paid webhooks
?set feedback:received //Sets current channel to receive all feedback:received webhooks
```
<img width="40%" height="40%" src="https://i.gyazo.com/9c37556fe4f38486be2660409566d485.png">


# Sellix Webhooks  
I embeded a simple express app to receive webhooks from Sellix.io, all you have to do is set it up on your shop. The default port for the webhook is 3000, and all webhook request should be forwarded to your server address (where the bot is hosted) with the */hook* endpoint  
[Add Sellix Webhook Endpoint](https://dashboard.sellix.io/developer/webhooks/all)  
<img width="40%" height="40%" src="https://i.gyazo.com/b73509330ed011f94e1a03e9be34902e.png">

Current supported webhook events are **order:paid**, **feedback:received**, **query:created**, **query:replied**, **product:stock**, **order:disputed**  

*Example of feedback:received webhook*  
<img width="50%" height="50%" src="https://i.gyazo.com/2398213d55d2f96003768e0ab19f9aed.png">
