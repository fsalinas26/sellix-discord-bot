const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const port = 3000;

const eventHandler = require('events');
const event = new eventHandler();

app.use(bodyParser.json());
app.post('/hook',async(req,res)=>{
    res.sendStatus(200);
    event.emit('event',req.body.event,req.body.data);
})

app.listen(port,()=>{
    console.log(`Listening for Sellix Webhooks on port ${port}`);
})

module.exports = {
    event:event
}