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
exports.handleOnReady = exports.getCommandObjectFromMessage = exports.handleOnMessage = void 0;
const commands_1 = require("./commands");
const index_1 = require("./index");
const cron = __importStar(require("cron"));
const prefix = "!";
const handleOnMessage = (message) => {
    if (message.author.bot) {
        return;
    }
    if (!message.content.startsWith(prefix)) {
        return;
    }
    console.log(`Message: ${JSON.stringify(message)}`);
    const commandObject = exports.getCommandObjectFromMessage(message);
    console.log(`Command Object: ${JSON.stringify(commandObject)}`);
    if (commandObject.command === commands_1.Command.PING) {
        commands_1.handlePing(message);
    }
    if (commandObject.command === commands_1.Command.ROLL) {
        commands_1.handleRoll(message, commandObject);
    }
    if (commandObject.command === commands_1.Command.DB) {
        commands_1.handleDB(message, commandObject);
    }
    if (commandObject.command === commands_1.Command.WHOAMI) {
        commands_1.handleWhoAmI(message, commandObject);
    }
};
exports.handleOnMessage = handleOnMessage;
const getCommandObjectFromMessage = (msg) => {
    const commandBody = msg.content.slice(prefix.length);
    const args = commandBody.split(" ");
    const command = args.shift().toLowerCase();
    const options = args.slice(0);
    return {
        commandBody,
        command,
        options
    };
};
exports.getCommandObjectFromMessage = getCommandObjectFromMessage;
const handleOnReady = () => {
    index_1.client.user.setActivity("Good and Slookered");
    const slookyChannelId = index_1.client.channels.cache.find(c => c.name === "slooky-time").id;
    index_1.client.channels.cache.get(slookyChannelId).send("I am too Slooky for this...");
    let scheduledMessage = new cron.CronJob('00 00 08 * * *', () => {
        // This runs every day at 10:30:00, you can do anything you want
        const today = new Date().toDateString();
        index_1.client.channels.cache.get(slookyChannelId).send(`Today is ${today.toString()}`);
    });
    // When you want to start it, use:
    scheduledMessage.start();
    // You could also make a command to pause and resume the job
};
exports.handleOnReady = handleOnReady;
//# sourceMappingURL=events.js.map