import { CommandInteraction, CommandInteractionOption } from "discord.js";
import Social from "../commands/social";

const interactionMock = {
  "member": {
      "user": {
          "id": "53908232506183680",
          "username": "Mason",
          "avatar": "a_d5efa99b3eeaa7dd43acca82f5692432",
          "discriminator": "1337",
          "public_flags": 131141,
      },
      "roles": ["539082325061836999"],
      "permissions": "2147483647",
  },
  user: {
    avatarURL: jest.fn()
  },
  "id": "786008729715212338",
  "guild_id": "290926798626357999",
  "app_permissions": "442368",
  "guild_locale": "en-US",
  "locale": "en-US",
  "options": {
    "data": [],
      "type": 1,
      "name": "cardsearch",
      "id": "771825006014889984"
  },
  "channel_id": "645027906669510667",
  reply: jest.fn(),
  deferReply: jest.fn()
} as unknown as CommandInteraction;


describe("Social Command", () => {
  it("Should be able to send a message", async () => {
    const data = [] as CommandInteractionOption[];

    const mock = {
      ...interactionMock,
      options: {
        data,
      }
    } as unknown as CommandInteraction;

    const social = new Social();
    await social.execute({ interaction: mock });

    expect(interactionMock.reply).toBeCalled();
  });
});