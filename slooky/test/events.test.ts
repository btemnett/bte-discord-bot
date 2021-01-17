import { handleOnMessage } from "../events"
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

    
})
