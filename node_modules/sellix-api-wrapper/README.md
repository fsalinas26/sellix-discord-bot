# sellix-api-wrapper
A complete NodeJS wrapper for the Sellix.io API.
<p align="center">
  <img src="https://i.gyazo.com/b67f3a75108799e042128fb57269e651.jpg">
</p>

## Description 
The purpose of this wrapper is to easily implement the Sellix API into your project and retrieve realtime data about your shop, restock and modify your products, view and reply to queries, and more.
## Requirements
In order to use the API calls, you need your API Key from the Sellix.io website. Find your key on the [security](https://dashboard.sellix.io/settings/security) page.
## Installation
npm i sellix-api-wrapper
## Usage
```javascript
const Sellix = require('sellix-api-wrapper');
const API = new Sellix.API('YOUR_API_KEY')

API.getAllOrders().then(res=>{
  console.log(res);
});

API.createCoupon("COUPON15OFF",15,-1,{"69571749194","695317319"}).then(res=>{
  console.log(res);
});

API.editProduct("demo65ab9133",{"Serials":["L1IELQ5","39131031"]}).then(res=>{
  console.log(res);
});

```

# API Endpoints
## Orders
### getAllOrders()
Fetches all orders sorted by creation date.

### getOrder(id)
Fetches a specific order by ID.

## Products
### getAllProducts()
Fetches all products sorted by creation date.

### getProduct(id)
Fetches a specific product by ID.

### createProduct(title, description, price, gateways, type, discount_value, custom_fields)
Creates a product with the given fields. Use custom_fields to declare non-required arguments.  
[See Sellix Documentation on Product Arguments](https://developers.sellix.io/documentation#product-create)
```javascript
API.createProduct("Product Title","New Product Desc",10.99,["STRIPE","BITCOIN"],"serials",0.0,{"crypto_confirmations_needed":2,"delivery_text":"Enjoy your product"}).then(res=>{
console.log(res);
});
```

### editProduct(id, custom_fields)
Edits a specific product by ID. Use custom_fields to declare the arguments to edit.  
[See Sellix Documentation on Product Arguments](https://developers.sellix.io/documentation#product-edit)
```javascript
API.editProduct("95619023",{"Title":"New Title","Price":25.99,"Serials":["AU9103PQE","GQOU3QLWE"]}).then(res=>{
console.log(res);
})
```
### deleteProduct(id)
Deletes a specific product by ID.

## Queries
### getAllQueries()
Fetches all queries sorted by creation date.

### getQuery(id)
Fetches a specific query by ID.

### replyQuery(id, reply)
Replies to a specific query by ID.
```ruby
API.replyQuery("demo2ab29431","Have you tried reinstalling?").then(res=>{
  console.log(res);
});
```

### closeQuery(id)
Closes a specific query by ID.

### reopenQuery(id)
Reopens a specific query by ID.

## Coupons
### getAllCoupons()
Fetches all coupons sorted by creation date.

### getCoupon(id)
Fetches a specific coupon by ID.

### createCoupon(code, discount_value, max_uses, products_bound)
Creates a coupon with the given fields.
```javascript
API.createCoupon("COUPON15",15,-1,{"695841804","695841805"}).then(res=>{
  console.log(res);
});
```

### editCoupon(id, custom_fields)
Edits a coupon by ID. Use custom_fields to declare the arguments to edit.  
[See Sellix Documentation on Coupon Arguments](https://developers.sellix.io/documentation#coupon-edit)
```javascript
API.editCoupon("demo6a3b178",{"code":"COUPON5","discount_value":5,"max_uses":5}).then(res=>{
  console.log(res);
});
```

### deleteCoupon(id)
Deletes a specific coupon by ID. 
## Feedback
### getAllFeedback()
Fetches all feedback sorted by creation date.

### getFeedback(id)
Fetches a specific feedback by ID.

### replyFeedback(id, reply)
Replies to a specific feedback by ID. 
```javascript
API.replyFeedback("demo1a83b7","Thanks for the feedback!").then(res=>{
  console.log(res);
});
```

## Blacklist
### getAllBlacklist()
Fetches all blacklist sorted by creation date.

### getBlacklist(id)
Fetches a specific blacklist by ID.

### createBlacklist(type, data, note)
Creates a blacklist using the given fields. Type must be 'email', 'ip', or 'country'. Data is blocked data. Note is optional.  
```javascript
API.createBlacklist("email","demoCustomer@gmail.com","Banned from shop").then(res=>{
  console.log(res);
});
```
### updateBlacklist(id, type, data, note)
Updates a specific blacklist by ID. See above for arguments.  
```javascript
API.updateBlacklist("demo6abc1f4","ip","273.314.1.31").then(res=>{
  console.log(res);
});
```

### deleteBlacklist(id)
Deletes a specific blacklist by ID.
 
## Payments (WIP)
### createPayment(title, product_id, quantity, gateway, value, confirmations, email, custom_fields)
Creates a payment with the given fields. Use custom_fields to declare non-required arguments.  
[Visit Sellix Documentation on Creating Payments](https://developers.sellix.io/documentation#sellix-checkout)

### deletePayment(id)
Deletes a payment by id.

