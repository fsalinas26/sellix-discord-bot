const express = require('express');
const eventHandler = require('events');
const event = new eventHandler();
const fs = require('fs')
const app = express();
const port = 2000;

app.post('/hook',async(req,res)=>{
    res.sendStatus(200);
    event.emit('event',res.body.evet,res.body.data);
})

app.listen(port,()=>{
    console.log(`Listening for Sellix Webhooks on port ${port}`);
})

module.exports = {
    event:event
}