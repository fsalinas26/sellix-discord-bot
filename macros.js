let months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
function displayDate(time)
{
    let day = new Date(time*1000);
    var str_out = "";
    str_out+= `${months[day.getMonth()]} ${day.getDate()} at ${day.toLocaleTimeString('en-US')}`;
    return str_out;
}

function displayTime(time)
{
    let day = new Date(time*1000);
    var str_out = "";
    str_out+= `${day.getHours()%12}:${day.getMinutes()} ${day.getHours() < 12 ? "AM":"PM"}`;
    return str_out;
}

module.exports = {
    displayDate: displayDate,
    displayTime: displayTime
}