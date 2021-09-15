const sqlite3 = require("sqlite3");
const fs = require('fs');
function create(){
        fs.existsSync('./database/users.db',async function(exist){
            if(exist){
                console.log('Database already exist!');
                return;
            }
            return new Promise(resolve=>{
                let db = new sqlite3.Database("./database/users.db", (err)=>{
                if(err){
                resolve(err.message); 
                }
                resolve("Succesfully created Database");
            }); 
        
        db.serialize(function() {
            db.run("CREATE TABLE Users (OrderID UNIQUE, DiscordID TEXT, RedeemedOn TEXT)");
            db.each("SELECT * FROM Users", function(err, row) {
                console.log(row);
            });
        });
        
        db.close();
        });
    })
}

module.exports = {
    create:create
}