import { Message } from "discord.js";
import { Command, handleDB, handlePing, handleRoll } from "./commands";


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

    if (commandObject.command === Command.PING){
        handlePing(message)
    }

    if (commandObject.command === Command.ROLL){
        handleRoll(message, commandObject)
    }

    if (commandObject.command === Command.DB){
        handleDB(message, commandObject);
    }
}

const getCommandObjectFromMessage = (msg) => {

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