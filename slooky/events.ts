import {
    Command,
    handleDB,
    handlePing,
    handleRoll,
    handleWhoAmI,
} from "./commands";


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