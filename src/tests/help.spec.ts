import Help from "../commands/help";
import { DiscordMock } from "../mock/discord";

const discordMock = new DiscordMock();
const interactionMock = discordMock.interaction;

jest.mock("../lib/Client")

describe("Help Command", () => {
  it("Should be able to send a message with the commands", async () => {
    const help = new Help();
    await help.execute({ interaction: interactionMock });

    expect(interactionMock.reply).toBeCalled();
  });
});