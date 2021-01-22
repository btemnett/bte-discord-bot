"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mapFlagsToValues = exports.handleWhoAmI = exports.handleDB = exports.handleRoll = exports.handlePing = exports.Command = void 0;
const _ = __importStar(require("lodash"));
const index_1 = require("./index");
let pings = [];
var Command;
(function (Command) {
    Command["PING"] = "ping";
    Command["ROLL"] = "roll";
    Command["DB"] = "db";
    Command["WHOAMI"] = "whoami";
})(Command = exports.Command || (exports.Command = {}));
const handlePing = (msg) => {
    const user = index_1.client.users.cache.get(`${msg.author.id}`);
    console.log(`author: ${user}`);
    const timeTaken = Date.now() - msg.createdTimestamp;
    const foundPingEventIndex = pings.findIndex(p => p.pinger === user);
    console.log(`foundpingeventindex : ${foundPingEventIndex}`);
    if (foundPingEventIndex >= 0) {
        pings[foundPingEventIndex].ping = timeTaken;
    }
    else {
        const pingEvent = {
            pinger: user,
            ping: timeTaken
        };
        pings = pings.concat([pingEvent]);
    }
    console.log(`pings array: ${pings}`);
    const fastestPinger = _.minBy(pings, 'ping');
    const slowestPinger = _.maxBy(pings, 'ping');
    const response = `Pong! mofo. This message has a latency of ${timeTaken}ms.
    I'm fast as fuck boi: ${fastestPinger.pinger} ${fastestPinger.ping}, 
    oh no Slodo: ${slowestPinger.pinger} ${slowestPinger.ping}`;
    msg.reply(response);
};
exports.handlePing = handlePing;
const handleRoll = (msg, commandObject) => {
    let content = null;
    const optionsLength = commandObject.options.length;
    const [times, sides] = commandObject.options[0].toLowerCase().split('d');
    if (optionsLength > 1 || isNaN(parseInt(sides)) || isNaN(parseInt(times))) {
        content = [
            {
                name: "Error",
                value: "The Command Structure is invalid. Please ensure your command matches !roll #D#"
            }
        ];
    }
    else {
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
        ];
    }
    const res = {
        embed: {
            color: 3447003,
            author: {
                name: index_1.client.user.username,
                icon_url: index_1.client.user.avatarURL
            },
            title: "DND Dice Roller",
            fields: content
        }
    };
    msg.reply(res);
};
exports.handleRoll = handleRoll;
const handleDB = (msg, commandObject) => {
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
};
exports.handleDB = handleDB;
const rollTheDice = (sides, times) => {
    let resultArray = [];
    for (let i = 0; i < times; ++i) {
        const result = Math.ceil(Math.random() * Math.ceil(sides));
        resultArray = resultArray.concat([result]);
    }
    return resultArray;
};
const handleWhoAmI = (msg, commandObject) => {
    const flagsMap = exports.mapFlagsToValues(commandObject);
    if (flagsMap['list']) {
        msg.reply(`list here eventually`);
        return;
    }
    const guild = index_1.client.guilds.cache.get(`${msg.guild.id}`);
    // const member = guild.member(msg.author.id);
    // const nickname = member ? member.displayName : null;
    const members = guild.members.fetch();
    console.log(`Members: ${members}`);
    const userContentArray = members.reduce((acc, curr) => {
        console.log(`User: ${curr.user.id}`);
        const userFields = [
            {
                name: "User Name",
                value: index_1.client.users.cache.get(curr.user.id),
                inline: false
            },
            {
                name: "Name",
                value: "Test Name",
                inline: true
            },
            {
                name: "Nick Name",
                value: curr.nickname,
                inline: true
            },
            {
                name: "Pronouns",
                value: "Test They/Them",
                inline: true
            }
        ];
        return acc.concat(userFields);
    }, []);
    const redsUser = members.find(m => m.user.id.toString().includes('efrondeur'));
    const red = index_1.client.users.cache.get(redsUser.user.id);
    const res = buildRes(userContentArray, red);
    msg.reply(res);
};
exports.handleWhoAmI = handleWhoAmI;
const buildRes = (userContentArray, red) => {
    return `\`\`\`
    markdown
    # Slookers
    ### Hey all. I want everyone to just take a minute to thank ${red} for all the work she has done to maintain this list. This list would not be around without her.
    \`\`\`
    `;
};
const mapFlagsToValues = (commandObject) => {
    const dict = {};
    let currentKey = null;
    _.forEach(commandObject.options, option => {
        if (_.startsWith(option, ("--" || "-"))) {
            const trimmedOption = removeDash(option);
            dict[trimmedOption] = [];
            currentKey = trimmedOption;
        }
        else {
            dict[currentKey].push(option);
        }
    });
    return dict;
};
exports.mapFlagsToValues = mapFlagsToValues;
const removeDash = (str) => !_.startsWith(str, "-") ? str : removeDash(str.slice(1));
//# sourceMappingURL=commands.js.map