const Discord = require('discord.js')
const fetch = require('node-fetch');
const token = ''; // your token goes here


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
    } else if (message.content === '!character') {
        let random = Math.floor(Math.random() * 40000);
        fetch(`https://api.jikan.moe/v3/character/${random}/pictures`)
            .then((respose) => {
                return respose.json();
            })
            .then((data) => {
                message.channel.send(data.pictures[0].large);
            })
    }
})

client.login(token)