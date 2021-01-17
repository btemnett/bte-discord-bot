import { handleDB, handlePing, handleRoll, handleWhoAmI, mapFlagsToValues } from "../commands"
import { CommandObject } from "../events"

describe("handleWhoAmI", () => {
    it("formats a reply string with user\'s nickname", () => {
        const message = { author: { nickname: 'testUser' },  reply: jest.fn() }

        handleWhoAmI(message, { command: 'test', commandBody: 'test command', options: [] })

        expect(message.reply).toHaveBeenCalledWith('You are: testUser')
    })
})


describe("mapFlagsToValues", () => {
    it("accepts CommandObject input with options containing flags and returns a map to their values", () => {
        const { mapFlagsToValues } = jest.requireActual("../commands")
        const input: CommandObject = { commandBody: "whoami --pronouns they/them", command: "whoami", options: ["--pronouns", "they/them"]}

        const result = mapFlagsToValues(input)

        expect(result).toEqual({ "pronouns": ["they/them"] })
    })

    it("accepts command object with empty options array and returns empty object", () => {
        const { mapFlagsToValues } = jest.requireActual("../commands")
        const input: CommandObject = { commandBody: "whoami --pronouns they/them", command: "whoami", options: []}

        const result = mapFlagsToValues(input)

        expect(result).toEqual({})
    })

    it("handles multiple values per flag", () => {
        const { mapFlagsToValues } = jest.requireActual("../commands")
        const input: CommandObject = { commandBody: "whoami --pronouns they/them she/her -testFlag one two three", command: "whoami", options: ["--pronouns", "they/them", "she/her", "--testFlag", "one", "two", "three"]}

        const result = mapFlagsToValues(input)

        expect(result).toEqual({ "pronouns": ["they/them", "she/her"], "testFlag": ["one", "two", "three"] })
    })
})
