let months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
function displayDate(time)
{
    let day = new Date(time*1000);
    var str_out = "";
    str_out+= `${months[day.getMonth()]} ${day.getDate()} at ${day.toLocaleTimeString('en-US')}`;
    return str_out;
}

function expiryDate(days)
{
    let expiry_date = new Date(); 
    expiry_date.setDate(expiry_date.getDate() + days);
    return (expiry_date.getTime()/1000);
}

function displayTime(time)
{
    let day = new Date(time*1000);
    var str_out = "";
    str_out+= day.toLocaleTimeString('en-US')
    return str_out;
}

module.exports = {
    displayDate: displayDate,
    displayTime: displayTime,
    expiryDate: expiryDate
}