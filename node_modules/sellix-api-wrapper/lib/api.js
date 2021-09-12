const axios = require('axios').default;

class Product{
    constructor(title, description, price, gateways, type, discount_value){
        this.title = title;
        this.description = description;
        this.price = price;
        this.gateways = gateways;
        this.type = type;
        this.discount_value = discount_value
    }
}
class Coupon{
    constructor(code,discount_value,max_uses,products_bound){
        this.code = code;
        this.discount_value = discount_value;
        this.max_uses = max_uses;
        this.products_bound = products_bound
    }
}
class Blacklist{
	constructor(type,data,note){
		this.type = type; 
		this.data = data;
		this.note = note;
	}
}
class Sellix{
    constructor(api_key){
        this.api_key = api_key;
        this.url = 'https://dev.sellix.io/v1/'
    }
	/**
	 * @returns Returns a list of all the Orders. The orders are sorted by creation date.
	 */
    getAllOrders() {
		const params = `orders`;
		return new Promise((resolve, reject) => {
			this.apiRequest(params).then(data => {
				resolve(data);
			}).catch(err => {
				reject(err);
			});
		});
	}
	/**
	 * @param {string} id ID of order to retrieve.
	 */
    getOrder(id) {
		const params = `orders/${id}`;
		return new Promise((resolve, reject) => {
			this.apiRequest(params).then(data => {
				resolve(data);
			}).catch(err => {
				reject(err);
			});
		});
	}
	/**
	 * @returns Returns a list of all the Products. The Products are sorted by creation date.
	 */
    getAllProducts() {
		const params = `products`;
		return new Promise((resolve, reject) => {
			this.apiRequest(params).then(data => {
				resolve(data);
			}).catch(err => {
				reject(err);
			});
		});
	}

    //FEEDBACK ENDPOINTS
	/**
	 * @param {string} id ID of feedback to retrieve.
	 */
    getFeedback(id) {
		const params = `feedback/${id}`;
		return new Promise((resolve, reject) => {
			this.apiRequest(params).then(data => {
				resolve(data);
			}).catch(err => {
				reject(err);
			});
		});
	}
	/**
	 * @returns Returns a list of all the feedback. The feedback are sorted by creation date. Invoice and Product objects are not shown in the list endpoint.
	 */
    getAllFeedback() {
		const params = `feedback`;
		return new Promise((resolve, reject) => {
			this.apiRequest(params).then(data => {
				resolve(data);
			}).catch(err => {
				reject(err);
			});
		});
	}
	/**
	 * @param {string} id ID of the feedback to reply to.
	 * @param {string} reply Desired reply.
	 */
    replyFeedback(id,reply) {
		const params = `feedback/reply/${id}`;
		return new Promise((resolve, reject) => {
			this.apiRequest(params,{'reply':reply},'POST').then(data => {
				resolve(data);
			}).catch(err => {
				reject(err);
			});
		});
	}

    //

    //Coupon Endpoints
	/**
	 * @param {string} id ID of the coupon to retrieve.
	 */
    getCoupon(id) {
		const params = `coupons/${id}`;
		return new Promise((resolve, reject) => {
			this.apiRequest(params).then(data => {
				resolve(data);
			}).catch(err => {
				reject(err);
			});
		});
	}
	/**
	 * @returns Returns a list of all the coupons. The coupons are sorted by creation date.
	 */
    getAllCoupons() {
		const params = `coupons`;
		return new Promise((resolve, reject) => {
			this.apiRequest(params).then(data => {
				resolve(data);
			}).catch(err => {
				reject(err);
			});
		});
	}
	/**
	 * @param {string} code Code of the coupon.
	 * @param {float} discount_value Percentage amount of the discount.
	 * @param {int} max_uses How many times can the coupon be used, defaulted to -1 (No limit).
	 * @param {array} products_bound Array of product IDs that the coupon can be used on.
	 */
    createCoupon(code,discount_value,max_uses,products_bound) {
        let coupon = new Coupon(code,discount_value,max_uses,products_bound);
		const params = `coupons`;
		return new Promise((resolve, reject) => {
			this.apiRequest(params,coupon,'POST').then(data => {
				resolve(data);
			}).catch(err => {
				reject(err);
			});
		});
	}
	/**
	 * @param {string} id ID of coupon to edit.
	 * @param {*} fields Coupon fields to edit. See Sellix Documentation. https://developers.sellix.io/documentation#coupon-edit
	 */
    editCoupon(id,fields) {
		const params = `coupons/${id}`;
		return new Promise((resolve, reject) => {
			this.apiRequest(params,fields,'PUT').then(data => {
				resolve(data);
			}).catch(err => {
				reject(err);
			});
		});
	}
	/**
	 * @param {string} id ID of the coupon to delete
	 */
    deleteCoupon(id)
    {
        const params = `coupons/${id}`;
		return new Promise((resolve, reject) => {
			this.apiRequest(params,null,'DELETE').then(data => {
				resolve(data);
			}).catch(err => {
				reject(err);
			});
		});
    }
    //
    

    //Product Endpoints
	/**
	 * @param {string} id ID of the product you want to retrieve 
	 */
    getProduct(id) {
		const params = `products/${id}`;
		return new Promise((resolve, reject) => {
			this.apiRequest(params).then(data => {
				resolve(data);
			}).catch(err => {
				reject(err);
			});
		});
	}
	/**
	 * 
	 * @param {string} title Title of the Product.
	 * @param {string} description Product description. 
	 * @param {float} price Price of the product.
	 * @param {array} gateways Array of available gateways. ex ["STRIPE","BITCOIN","CASHAPP"]
	 * @param {string} type Type of product. serials, file, or service.
	 * @param {float} discount_value Percentage amount of discount
	 * @param {*} fields Product fields to set. See Sellix Documentation. https://developers.sellix.io/documentation#product-create
	 */
    createProduct(title, description, price, gateways, type, discount_value,fields) {
        let product = new Product(title,description,price,gateways,type,discount_value);
		const params = `products`;
		return new Promise((resolve, reject) => {
			this.apiRequest(params, {...product,...fields},'POST').then(data => {
				resolve(data);
			}).catch(err => {
				reject(err);
			});
		});
	}
	/**
	 * @param {string} id ID of the product to edit
	 * @param {*} fields Product fields to edit. See Sellix Documentation. https://developers.sellix.io/documentation#product-edit
	 */
    editProduct(id,fields) {
		const params = `products/${id}`;
		return new Promise((resolve, reject) => {
			this.apiRequest(params,fields,'PUT').then(data => {
				resolve(data);
			}).catch(err => {
				reject(err);
			});
		});
	}

	
	/**
	 * @param {string} id ID of the product to delete
	 */
    deleteProduct(id) {
		const params = `products/${id}`;
		return new Promise((resolve, reject) => {
			this.apiRequest(params,null,'DELETE').then(data => {
				resolve(data);
			}).catch(err => {
				reject(err);
			});
		});
	}

    //

    //Query Endpoints
	/**
	 * @param {string} id ID of the query to retrieve
	 */
    getQuery(id) {
		const params = `queries/${id}`;
		return new Promise((resolve, reject) => {
			this.apiRequest(params).then(data => {
				resolve(data);
			}).catch(err => {
				reject(err);
			});
		});
	}
	/**
	 * @returns Returns a list of all the Queries. The queries are sorted by creation date.
	 */
    getAllQueries() {
		const params = `queries`;
		return new Promise((resolve, reject) => {
			this.apiRequest(params).then(data => {
				resolve(data);
			}).catch(err => {
				reject(err);
			});
		});
	}
	/**
	 * @param {string} id ID of the query to reply to
	 * @param {string} reply Desired reply
	 */
    replyQuery(id,reply) {
		const params = `queries/reply/${id}`;
		return new Promise((resolve, reject) => {
			this.apiRequest(params,{"reply":reply},'POST').then(data => {
				resolve(data);
			}).catch(err => {
				reject(err);
			});
		});
	}
	/**
	 * @param {string} id ID of query to close
	 */
    closeQuery(id) {
		const params = `queries/close/${id}`;
		return new Promise((resolve, reject) => {
			this.apiRequest(params,null,'POST').then(data => {
				resolve(data);
			}).catch(err => {
				reject(err);
			});
		});
	}
	/**
	 * @param {string} id ID of query to reopen
	 */
    reopenQuery(id) {
		const params = `queries/reopen/${id}`;
		return new Promise((resolve, reject) => {
			this.apiRequest(params,null,'POST').then(data => {
				resolve(data);
			}).catch(err => {
				reject(err);
			});
		});
	}
    //
	
	//Blacklist Endpoints
	/**
	 * @returns Returns a list of the blacklist. The blacklist are sorted by creation date.
	 */
	getAllBlacklist()
	{
		const params = `blacklists`
		return new Promise((resolve,reject)=>{
			this.apiRequest(params).then(data=>{
				resolve(data);
			}).catch(err=> {
				reject(err);
			})
		})
	}
	/**
	 * @param {string} id ID of Blacklists to retrieve
	 */
	getBlacklist(id)
	{
		const params = `blacklists/${id}`;
		return new Promise((resolve,reject)=>{
			this.apiRequest(params).then(data=>{
				resolve(data);
			}).catch(err=>{
				reject(err);
			});
		});
	}
	/**
	 * @param {string} type Can be email, ip or country.
	 * @param {string} data Blocked data. Either country code, email or IP address
	 * @param {string} note Optional note for the reasoning of the blacklist.
	 */
	createBlacklist(type,data,note)
	{
		let blacklist = new Blacklist(type,data,note);
		const params = `blacklists`;
		return new Promise((resolve,reject)=>{
			this.apiRequest(params,blacklist,'POST').then(data=>{
				resolve(data);
			}).catch(err=>{
				reject(err)
			});
		});
	}


	/**
	 * @param {string} id ID of Blacklists to edit.
	 * @param {string} type Can be email, ip or country.
	 * @param {string} data Blocked data. Either country code, email or IP address.
	 * @param {string} note Optional note for the reasoning of the blacklist.
	 */
	updateBlacklist(id,type,data,note)
	{
		let blacklist = new Blacklist(type,data,note);
		const params = `blacklists/${id}`;
		return new Promise((resolve,reject)=>{
			this.apiRequest(params,blacklist,'PUT').then(data=>{
				resolve(data);
			}).catch(err=>{
				reject(err)
			});
		});
	}
	/**
	 * @param {string} id ID of Blacklists to delete.
	 */
	deleteBlacklist(id)
	{
		const params = `blacklists/${id}`;
		return new Promise((resolve,reject)=>{
			this.apiRequest(params).then(data=>{
				resolve(data);
			}).catch(err=>{
				resolve(err);
			})
		})
	}

	//
	/**
	 * @param {string} params URL route 
	 * @param {*} body Content of body.
	 * @param {string} method HTTP Method. Default is 'GET'
	 */
    async apiRequest(params,body,method){
        return await new Promise((resolve, reject) => {
            axios({
                    method: method ? method:'GET',
                    url: this.url + params,
                    data: body,
                    headers: {
                        'Authorization': `Bearer ${this.api_key}`,
                    },
                    responseType: 'json',
                    proxy: false,
            }).then(res=>{
                    return resolve(res.data);
            }).catch((err=>{
                    return reject(err);
            }));

        });
    }

}

module.exports = Sellix;
