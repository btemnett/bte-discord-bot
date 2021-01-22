"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const commands_1 = require("../commands");
describe("handleWhoAmI", () => {
    it("formats a reply string with user\'s nickname", () => {
        const message = { author: { nickname: 'testUser' }, reply: jest.fn() };
        commands_1.handleWhoAmI(message, { command: 'test', commandBody: 'test command', options: [] });
        expect(message.reply).toHaveBeenCalledWith('You are: testUser');
    });
});
describe("mapFlagsToValues", () => {
    it("accepts CommandObject input with options containing flags and returns a map to their values", () => {
        const { mapFlagsToValues } = jest.requireActual("../commands");
        const input = { commandBody: "whoami --pronouns they/them", command: "whoami", options: ["--pronouns", "they/them"] };
        const result = mapFlagsToValues(input);
        expect(result).toEqual({ "pronouns": ["they/them"] });
    });
    it("accepts command object with empty options array and returns empty object", () => {
        const { mapFlagsToValues } = jest.requireActual("../commands");
        const input = { commandBody: "whoami --pronouns they/them", command: "whoami", options: [] };
        const result = mapFlagsToValues(input);
        expect(result).toEqual({});
    });
    it("handles multiple values per flag", () => {
        const { mapFlagsToValues } = jest.requireActual("../commands");
        const input = { commandBody: "whoami --pronouns they/them she/her -testFlag one two three", command: "whoami", options: ["--pronouns", "they/them", "she/her", "--testFlag", "one", "two", "three"] };
        const result = mapFlagsToValues(input);
        expect(result).toEqual({ "pronouns": ["they/them", "she/her"], "testFlag": ["one", "two", "three"] });
    });
});
//# sourceMappingURL=commands.test.js.map