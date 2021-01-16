import * as _ from 'lodash';
import { client } from './index';


let pings = []

export const enum Command {
    PING = "ping",
    ROLL = "roll"
}

export const handlePing = (msg, commandObject) => {

    const user = client.users.cache.get(`${msg.author.id}`);
    console.log(`author: ${user}`)

    const timeTaken = compareTimeStamps(Date.now(), msg.createdTimestamp);
    console.log({timeTaken})
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

    // "!roll D# X#"
    // if (commandObject.options.length > 2 || commandObject.options.length === 0){
    //     msg.reply(`The command structure is !roll D# X#. There are either too little or too many arguments.`);
    //     return;
    // }
    // if (isNaN(parseInt(commandObject.options[0].slice(1)))){
    //     msg.reply(`The command structure is !roll D# X#. ${commandObject.options[0].slice(1)} is not a number`);
    //     return;
    // }
    // if (isNaN(parseInt(commandObject.options[1].slice(1)))){
    //     msg.reply(`The command structure is !roll D# X#. ${commandObject.options[1].slice(1)} is not a number`);
    //     return;
    // }
    // if (commandObject.options[0][0].toLowerCase() !== 'd'){
    //     msg.reply(`The command structure is !roll D# X#. ${commandObject.options[0][0]} is not accepted for sides flag`);
    //     return;
    // }
    // if (commandObject.options[1][0].toLowerCase() !== 'x'){
    //     msg.reply(`The command structure is !roll D# X#. ${commandObject.options[0][0]} is not accepted for the times flag`);
    //     return;
    // }

    // const sides = parseInt(commandObject.options[0].slice(1));
    // const times = parseInt(commandObject.options[1].slice(1));
    let content = null;
    const index = commandObject.options[0].findIndex(char => char.toLowerCase() === 'd');
    const sides = commandObject.options.slice(0, index);
    const times = commandObject.options.slice(index + 1)
    if( index < 0 || !isNaN(parseInt(sides)) || !isNaN(parseInt(times))){
        content = [
            {
                name: "Error",
                value: "The Command Structure is invalid. Please ensure your command matches !roll #D#"
            }
        ]
    }


    const rollResult = rollTheDice(sides, times)
    const res = {embed: {
        color: 3447003,
        author: {
          name: client.user.username,
          icon_url: client.user.avatarURL
        },
        title: "DND Dice Roller",
        description: "Command Structure !roll D# X#",
        fields: [{
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
    }

    msg.reply(res)
}

const rollTheDice = (sides, times) => {

    let resultArray = [];
    for (let i = 0; i < times; ++i) {
        const result = Math.ceil(Math.random() * Math.ceil(sides));
        resultArray = resultArray.concat([result])
    }
    return resultArray;
}

const getRollParametersFromOptions = (option) => {

    
}


// use for storing messages later
// const guild = client.guilds.cache.get(`${msg.guild.id}`);
// console.log(`guild: ${guild}`)

// const member = guild.member(`${msg.author.id}`);
// console.log(`member: ${member.displayName}`)
// console.log(`message.author: ${msg.author.username}`); => false_owl
// console.log(`message.author: ${msg.author.nickname}`); 
// const member = guild.member(msg.authorID);
// const nickname = member ? member.displayName : null;

const compareTimeStamps = (date1, date2) => {
    console.log({date1})
    console.log(`Type of date 1: ${typeof date1}`)
    console.log({date2})
    console.log(`Type of date 2: ${typeof date2}`)

    return date1 - date2;
}