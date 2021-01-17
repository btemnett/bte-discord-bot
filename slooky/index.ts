import Discord from 'discord.js';
import { config } from './config';
import { handleOnMessage } from './events';

export let client
if (process.env.NODE_ENV === "production") {
    client = new Discord.Client();
} else {
    client = { on: () => {}, login: () => {} }
}

try {

    client.on("message", handleOnMessage);
    client.login(config.BOT_TOKEN);

} catch(e){
    
    console.log(`Error: ${e}`);
}

