import Discord from 'discord.js';
import { handleOnMessage, handleOnReady } from './events';
import AWS from 'aws-sdk';


const region = 'us-west-1';
const secretName = "bot-token";
let secret;
let decodedBinarySecret;

// Create a Secrets Manager client
export const awsClient = new AWS.SecretsManager({
    region: region
});

export let client
if (process.env.NODE_ENV === "production") {
    client = new Discord.Client();
} else {
    client = { on: () => { }, login: () => { } }
}

try {
    awsClient.getSecretValue({ SecretId: secretName }, function (err, data) {
        if (err) {
            if (err.code === 'DecryptionFailureException') {
                // Secrets Manager can't decrypt the protected secret text using the provided KMS key.
                // Deal with the exception here, and/or rethrow at your discretion.
                console.log(`Err: ${JSON.stringify(err)}`);
                throw err;
            } else if (err.code === 'InternalServiceErrorException') {
                // An error occurred on the server side.
                // Deal with the exception here, and/or rethrow at your discretion.
                console.log(`Err: ${JSON.stringify(err)}`);
                throw err;
            } else if (err.code === 'InvalidParameterException') {
                // You provided an invalid value for a parameter.
                // Deal with the exception here, and/or rethrow at your discretion.
                console.log(`Err: ${JSON.stringify(err)}`);
                throw err;
            } else if (err.code === 'InvalidRequestException') {
                // You provided a parameter value that is not valid for the current state of the resource.
                // Deal with the exception here, and/or rethrow at your discretion.
                throw err;
            } else if (err.code === 'ResourceNotFoundException') {
                // We can't find the resource that you asked for.
                // Deal with the exception here, and/or rethrow at your discretion.
                console.log(`Err: ${JSON.stringify(err)}`);
                throw err;
            }
            console.log(`Err: ${JSON.stringify(err)}`);
        }
        else {
            // console.log(`Secret data: ${JSON.stringify(data)}`);
            // Decrypts secret using the associated KMS CMK.
            // Depending on whether the secret is a string or binary, one of these fields will be populated.
            if ('SecretString' in data) {
                secret = data.SecretString;
            } else {
                console.log("second case")

                // let buff = Buffer.from(data.SecretBinary, 'base64');
                // decodedBinarySecret = buff.toString('ascii');
            }
        }

        client.on("message", handleOnMessage);
        client.on("ready", handleOnReady);

        client.login(JSON.parse(secret).BOT_TOKEN);
    });

} catch (e) {
    console.error(`Error: ${e}`);
}

