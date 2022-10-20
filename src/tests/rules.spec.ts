import Rules from "../commands/rules";
import { DiscordMock } from "../mock/discord";

const discordMock = new DiscordMock();
const interactionMock = discordMock.interaction;

describe("Rules Command", () => {
  it("Should be able to send a message", async () => {
    const rules = new Rules();
    await rules.execute({ interaction: interactionMock });

    expect(interactionMock.reply).toBeCalled();
  });
});