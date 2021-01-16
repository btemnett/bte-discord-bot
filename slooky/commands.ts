import * as _ from 'lodash';
import { client } from './index';


let pings = []

export const enum Command {
    PING = "ping",
    ROLL = "roll",
    DB = "db"
}

export const handlePing = (msg) => {

    const user = client.users.cache.get(`${msg.author.id}`);
    console.log(`author: ${user}`)

    const timeTaken = compareTimeStamps(Date.now(), msg.createdTimestamp);
    console.log({ timeTaken })
    console.log(`time taken type ${typeof timeTaken}`)

    const foundPingEventIndex = pings.findIndex(p => p.pinger === user);

    console.log(`foundpingeventindex : ${foundPingEventIndex}`)
    if (foundPingEventIndex >= 0) {

        pings[foundPingEventIndex].ping = timeTaken
    } else {

        const pingEvent = {
            pinger: user,
            ping: timeTaken
        }
        pings = pings.concat([pingEvent])
    }

    console.log(`pings array: ${pings}`)

    const fastestPinger = _.minBy(pings, 'ping');
    const slowestPinger = _.maxBy(pings, 'ping');

    const response = `Pong! mofo. This message has a latency of ${timeTaken}ms.
    I'm fast as fuck boi: ${fastestPinger.pinger} ${fastestPinger.ping}, 
    oh no Slodo: ${slowestPinger.pinger} ${slowestPinger.ping}`

    msg.reply(response)
}

export const handleRoll = (msg, commandObject) => {

    let content = null;
    const optionsLength = commandObject.options.length;
    const [times, sides] = commandObject.options[0].toLowerCase().split('d');

    if (optionsLength > 1 || isNaN(parseInt(sides)) || isNaN(parseInt(times))) {
        content = [
            {
                name: "Error",
                value: "The Command Structure is invalid. Please ensure your command matches !roll #D#"
            }
        ]
    } else {
        const rollResult = rollTheDice(sides, times);

        content = [
            {
                name: "Sides",
                value: `${sides}`
            },
            {
                name: "Times",
                value: `${times}`
            },
            {
                name: "Rolls",
                value: `${rollResult}`
            },
            {
                name: "Total",
                value: `${_.sum(rollResult)}`
            }
        ]
    }

    const res = {
        embed: {
            color: 3447003,
            author: {
                name: client.user.username,
                icon_url: client.user.avatarURL
            },
            title: "DND Dice Roller",
            fields: content
        }
    }

    msg.reply(res)
}

export const handleDB = (msg, commandObject) => {
    // cases 
    // create a dile
    // read a file
    // update a file
    // delete a file


    // use for storing messages later
    // const guild = client.guilds.cache.get(`${msg.guild.id}`);
    // console.log(`guild: ${guild}`)

    // const member = guild.member(`${msg.author.id}`);
    // console.log(`member: ${member.displayName}`)
    // console.log(`message.author: ${msg.author.username}`); => false_owl
    // console.log(`message.author: ${msg.author.nickname}`); 
    // const member = guild.member(msg.authorID);
    // const nickname = member ? member.displayName : null;
}

const rollTheDice = (sides, times) => {

    let resultArray = [];
    for (let i = 0; i < times; ++i) {
        const result = Math.ceil(Math.random() * Math.ceil(sides));
        resultArray = resultArray.concat([result])
    }
    return resultArray;
}


const compareTimeStamps = (date1, date2) => {
    console.log({ date1 })
    console.log(`Type of date 1: ${typeof date1}`)
    console.log({ date2 })
    console.log(`Type of date 2: ${typeof date2}`)

    return date1 - date2;
}