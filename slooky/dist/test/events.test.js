"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const events_1 = require("../events");
const commands_1 = require("../commands");
jest.mock("../commands");
describe("handleOnMessage", () => {
    it("does nothing if message author is bot", () => {
        const message = { author: { bot: true } };
        events_1.handleOnMessage(message);
        expect(commands_1.handlePing).not.toBeCalled();
        expect(commands_1.handleRoll).not.toBeCalled();
        expect(commands_1.handleDB).not.toBeCalled();
    });
    it("does nothing if message content does not start with prefix character", () => {
        const message = { author: { bot: false }, content: "invalid test message" };
        events_1.handleOnMessage(message);
        expect(commands_1.handlePing).not.toBeCalled();
        expect(commands_1.handleRoll).not.toBeCalled();
        expect(commands_1.handleDB).not.toBeCalled();
    });
    it("calls handlePing if message content starts with !ping", () => {
        const message = { author: { bot: false }, content: "!ping and stuff" };
        events_1.handleOnMessage(message);
        expect(commands_1.handlePing).toBeCalled();
    });
    it("calls handleRoll if message content starts with !ping", () => {
        const message = { author: { bot: false }, content: "!roll 100d100" };
        events_1.handleOnMessage(message);
        expect(commands_1.handleRoll).toBeCalled();
    });
    it('calls handleDB if message content starts !db', () => {
        const message = { author: { bot: false }, content: "!db" };
        events_1.handleOnMessage(message);
        expect(commands_1.handleDB).toBeCalled();
    });
});
describe("getCommandObjectFromMessage", () => {
    it("assembles command object for ping message", () => {
        const message = { author: { bot: false }, content: "!ping" };
        const result = events_1.getCommandObjectFromMessage(message);
        expect(result).toEqual({ commandBody: "ping", command: 'ping', options: [] });
    });
    it("assembles command object for roll message", () => {
        const message = { author: { bot: false }, content: "!roll 2d20" };
        const result = events_1.getCommandObjectFromMessage(message);
        expect(result).toEqual({ commandBody: "roll 2d20", command: 'roll', options: ["2d20"] });
    });
    it("assembles command object for a simple whoami message", () => {
        const message = { author: { bot: false }, content: "!whoami" };
        const result = events_1.getCommandObjectFromMessage(message);
        expect(result).toEqual({ commandBody: "whoami", command: 'whoami', options: [] });
    });
    it("assembles command object for a complex whoami message", () => {
        const message = { author: { bot: false }, content: "!whoami --name testName --pronouns they/them" };
        const result = events_1.getCommandObjectFromMessage(message);
        expect(result).toEqual({ commandBody: "whoami --name testName --pronouns they/them", command: 'whoami', options: ["--name", "testName", "--pronouns", "they/them"] });
    });
});
//# sourceMappingURL=events.test.js.map