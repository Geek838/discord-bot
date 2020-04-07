const Discord = require('discord.js')
const fetch = require('node-fetch');
const token = ''; // Your discord token goes here


const client = new Discord.Client();

const weekday = new Array(7);
weekday[0] = "monday";
weekday[1] = "tuesday";
weekday[2] = "wednesday";
weekday[3] = "thursday";
weekday[4] = "friday";
weekday[5] = "saturday";
weekday[6] = "sunday";

const date = new Date();
const currDay = date.getDay();
const today = weekday[currDay];

client.once('ready', () => {
    console.log('connected');
})

client.on('message', message => {
    if (message.content === '!anime') {
        fetch(`https://api.jikan.moe/v3/schedule/${today}`)
            .then((respose) => {
                return respose.json();
            })
            .then((data) => {
                for (anime of data[today]) {
                    message.channel.send(anime.title)
                }
            })
    }
})

client.login(token)