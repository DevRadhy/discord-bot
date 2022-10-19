import Social from "../commands/social";
import { DiscordMock } from "../mock/discord";

const discordMock = new DiscordMock();
const interactionMock = discordMock.interaction;

describe("Social Command", () => {
  it("Should be able to send a message", async () => {
    const social = new Social();
    await social.execute({ interaction: interactionMock });

    expect(interactionMock.reply).toBeCalled();
  });
});