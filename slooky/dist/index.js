"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.client = exports.awsClient = void 0;
const discord_js_1 = __importDefault(require("discord.js"));
const events_1 = require("./events");
const aws_sdk_1 = __importDefault(require("aws-sdk"));
const region = 'us-west-1';
const secretName = "prod-bot-token";
let secret;
let decodedBinarySecret;
// Create a Secrets Manager client
exports.awsClient = new aws_sdk_1.default.SecretsManager({
    region: region
});
if (process.env.NODE_ENV === "production") {
    exports.client = new discord_js_1.default.Client();
}
else {
    exports.client = { on: () => { }, login: () => { } };
}
try {
    exports.awsClient.getSecretValue({ SecretId: secretName }, function (err, data) {
        if (err) {
            if (err.code === 'DecryptionFailureException') {
                // Secrets Manager can't decrypt the protected secret text using the provided KMS key.
                // Deal with the exception here, and/or rethrow at your discretion.
                console.log(`Err: ${JSON.stringify(err)}`);
                throw err;
            }
            else if (err.code === 'InternalServiceErrorException') {
                // An error occurred on the server side.
                // Deal with the exception here, and/or rethrow at your discretion.
                console.log(`Err: ${JSON.stringify(err)}`);
                throw err;
            }
            else if (err.code === 'InvalidParameterException') {
                // You provided an invalid value for a parameter.
                // Deal with the exception here, and/or rethrow at your discretion.
                console.log(`Err: ${JSON.stringify(err)}`);
                throw err;
            }
            else if (err.code === 'InvalidRequestException') {
                // You provided a parameter value that is not valid for the current state of the resource.
                // Deal with the exception here, and/or rethrow at your discretion.
                throw err;
            }
            else if (err.code === 'ResourceNotFoundException') {
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
            }
            else {
                console.log("second case");
                // let buff = Buffer.from(data.SecretBinary, 'base64');
                // decodedBinarySecret = buff.toString('ascii');
            }
        }
        exports.client.on("message", events_1.handleOnMessage);
        exports.client.on("ready", events_1.handleOnReady);
        exports.client.login(JSON.parse(secret).BOT_TOKEN);
    });
}
catch (e) {
    console.error(`Error: ${e}`);
}
//# sourceMappingURL=index.js.map