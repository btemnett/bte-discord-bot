import {
    Command,
    handleDB,
    handlePing,
    handleRoll,
    handleWhoAmI,
} from "./commands";
import { client } from './index';
import * as cron from 'cron';


const prefix = "!";

export const handleOnMessage = (message) => {
    if (message.author.bot) {
        return;
    }
    if (!message.content.startsWith(prefix)) {
        return
    }

    console.log(`Message: ${JSON.stringify(message)}`);
    const commandObject = getCommandObjectFromMessage(message);
    console.log(`Command Object: ${JSON.stringify(commandObject)}`);

    if (commandObject.command === Command.PING) {
        handlePing(message)
    }

    if (commandObject.command === Command.ROLL) {
        handleRoll(message, commandObject)
    }

    if (commandObject.command === Command.DB) {
        handleDB(message, commandObject);
    }

    if (commandObject.command === Command.WHOAMI) {
        handleWhoAmI(message, commandObject)
    }
}


export type CommandObject = {
    commandBody: string
    command: string
    options: Array<string>
}

export type Message = {
    content: string
    author: Author
}

export type Author = {
    bot: boolean
    id?: number
    userName?: string
    nickname?: string
}

export const getCommandObjectFromMessage = (msg: Message): CommandObject => {

    const commandBody = msg.content.slice(prefix.length);
    const args = commandBody.split(" ");
    const command = args.shift().toLowerCase();
    const options = args.slice(0);

    return {
        commandBody,
        command,
        options
    }
}

export const handleOnReady = () => {

    client.user.setActivity("Good and Slookered");
    const slookyChannelId = client.channels.cache.find(c => c.name === "slooky-time").id;
    client.channels.cache.get(slookyChannelId).send("I am too Slooky for this...");

    let scheduledMessage = new cron.CronJob('00 00 08 * * *', () => {
        // This runs every day at 10:30:00, you can do anything you want
        const today = new Date().toDateString()
        client.channels.cache.get(slookyChannelId).send(`Today is ${today.toString()}`);
    });

    // When you want to start it, use:
    scheduledMessage.start()
    // You could also make a command to pause and resume the job
}