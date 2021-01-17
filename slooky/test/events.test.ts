import { handleOnMessage, getCommandObjectFromMessage } from "../events"
import { handleDB, handlePing, handleRoll } from "../commands"
jest.mock("../commands")

describe("handleOnMessage", () => {
    it("does nothing if message author is bot", () => {
        const message = { author: { bot: true } }

        handleOnMessage(message)

        expect(handlePing).not.toBeCalled()
        expect(handleRoll).not.toBeCalled()
        expect(handleDB).not.toBeCalled()
    })

    it("does nothing if message content does not start with prefix character", () => {
        const message = { author: { bot: false }, content: "invalid test message" }

        handleOnMessage(message)

        expect(handlePing).not.toBeCalled()
        expect(handleRoll).not.toBeCalled()
        expect(handleDB).not.toBeCalled()
    })

    it("calls handlePing if message content starts with !ping", () => {
        const message = { author: { bot: false }, content: "!ping and stuff" }

        handleOnMessage(message)

        expect(handlePing).toBeCalled()
    })

    it("calls handleRoll if message content starts with !ping", () => {
        const message = { author: { bot: false }, content: "!roll 100d100" }

        handleOnMessage(message)

        expect(handleRoll).toBeCalled()
    })

    it('calls handleDB if message content starts !db', () => {
        const message = { author: { bot: false }, content: "!db" }

        handleOnMessage(message)

        expect(handleDB).toBeCalled()
    })
})

describe("getCommandObjectFromMessage", () => {
    it("assembles command object for ping message", () => {
        const message = { author: { bot: false }, content: "!ping" }

        const result = getCommandObjectFromMessage(message)

        expect(result).toEqual({ commandBody: "ping", command: 'ping', options: [] })
    })

    it("assembles command object for roll message", () => {
        const message = { author: { bot: false }, content: "!roll 2d20" }

        const result = getCommandObjectFromMessage(message)

        expect(result).toEqual({ commandBody: "roll 2d20", command: 'roll', options: ["2d20"] })
    })

    it("assembles command object for a simple whoami message", () => {
        const message = { author: { bot: false }, content: "!whoami" }

        const result = getCommandObjectFromMessage(message)

        expect(result).toEqual({ commandBody: "whoami", command: 'whoami', options: [] })
    })

    it("assembles command object for a complex whoami message", () => {
        const message = { author: { bot: false }, content: "!whoami --name testName --pronouns they/them" }

        const result = getCommandObjectFromMessage(message)

        expect(result).toEqual({ commandBody: "whoami --name testName --pronouns they/them", command: 'whoami', options: ["--name", "testName", "--pronouns", "they/them"] })
    })
})
