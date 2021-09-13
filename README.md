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

## ?restock [productid/nickname] [serials]
Restocks a product on your website by updating it's serials.  
**Usage:**  
```
?restock 6ab37fif7e9 A8FJ1LI, FEBURLAO, C3L1F8A0, G8LA1L3JF  //Use comma-seperated list for serials  
?restock demo_nickname A8FJ1LI, FEBURLAO, C3L1F8A0, G8LA1L3JF //See below for adding product nicknames
```

## ?nickname [add/delete/all] 
Sets a nickname for a specific product ID in **config.json**  
**Usage:**
```
?nickname add demo_nickname 6ab37fif7e9 // ProductID 6ab37fif7e9 can now be referenced using 'demo_nickname'
?nickname delete demo_nickname // Deletes 'demo_nickname' from nicknames
```

## ?reply [query/feedback] [id] [reply] 
Replies to a query or feedback by id. 
**Usage:**
```
?reply query 15bd56-18c3475d4c-c906ed Everything all set?
?reply feedback 82fh9c-a0a5ghf3da-hj01a2 Thanks for the feedback!
```

## ?products  
Retrieves all products and sends an iterable Discord embed.

## ?orders  
Retrieves all orders and sends an iterable Discord embed.  

## ?queries  
Retrieves all queries and sends an iterable Discord embed.

## ?feedback  
Retrieves all feedback and sends an iterable Discord embed.

# Sellix Webhooks
The default port for the webhook is 3000, and all webhook request should be forwarded to  
your server address with the */hook* route  
[Add Sellix Webhook Endpoint](https://dashboard.sellix.io/developer/webhooks/all)  
<img width="50%" height="50%" src="https://i.gyazo.com/b73509330ed011f94e1a03e9be34902e.png">

Current supported webhook events are **order:paid**, **feedback:received**, **query:created**, **product:stock**, **query:replied**
