import { CommandInteraction, CommandInteractionOption, GuildMember, User } from "discord.js";
import Ban from "../commands/ban";

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
  guild: {
    members: {
      ban: jest.fn()
    }
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

describe("Ban Command", () => {
  it("Should return a message of how to use if there are no arguments", async () => {
    const data = [] as CommandInteractionOption[];

    const mock = {
      ...interactionMock,
      options: {
        data,
      }
    } as unknown as CommandInteraction;

    const ban = new Ban();
    await ban.execute({ interaction: mock });

    expect(interactionMock.reply).toBeCalledWith({ content: `Como usar: **${ban.usage}**` });
    expect(interactionMock.reply).toBeCalled();
  });

  it("Should return an error message if the user is not valid", async () => {
    const data = [
      {
        "type": "USER",
        "name": "member"
      }
    ] as CommandInteractionOption[];

    const mock = {
      ...interactionMock,
      options: {
        data
      }
    } as unknown as CommandInteraction;

    const ban = new Ban();
    await ban.execute({ interaction: mock });

    expect(interactionMock.reply).toBeCalledWith({ content: "Mencione um usuário válido 🤷‍♀️." });
    expect(interactionMock.reply).toBeCalled();
  });

  it("Should return an error message if the author does not have permission", async () => {
    const data = [
      {
        "type": "USER",
        "name": "member",
        user: jest.fn() as unknown as User
      }
    ] as CommandInteractionOption[];

    const mock = {
      ...interactionMock,
      memberPermissions: {
        has: jest.fn()
      },
      options: {
        data
      }
    } as unknown as CommandInteraction;

    const ban = new Ban();
    await ban.execute({ interaction: mock });

    expect(interactionMock.reply).toBeCalledWith({ content: "🚨 Desculpe, você não tem permissão para banir esse membro." });
    expect(interactionMock.reply).toBeCalled();
  });

  it("Should return an error message if the client does not have permission", async () => {
    const data = [
      {
        "type": "USER",
        "name": "member",
        user: jest.fn() as unknown as User
      }
    ] as CommandInteractionOption[];

    const mock = {
      ...interactionMock,
      memberPermissions: {
        has: jest.fn().mockReturnValue(true)
      },
      guild: {
        me: {
          permissions: {
            has: jest.fn()
          }
        }
      },
      options: {
        data
      }
    } as unknown as CommandInteraction;

    const ban = new Ban();
    await ban.execute({ interaction: mock });

    expect(interactionMock.reply).toBeCalledWith({ content: "🚨 Desculpe, eu não tenho permissão para banir esse membro." });
    expect(interactionMock.reply).toBeCalled();
  });

  it("Should be able to ban a member with an optional reason", async () => {
    const data = [
      {
        "type": "USER",
        "name": "member",
        user: jest.fn() as unknown as User
      },
      {
        "type": "INTEGER",
        "name": "days",
        "value": 0
      },
      {
        "type": "STRING",
        "name": "reason",
        "value": "some reason."
      }
    ] as CommandInteractionOption[];

    const mock = {
      ...interactionMock,
      memberPermissions: {
        has: jest.fn().mockReturnValue(true)
      },
      guild: {
        ...interactionMock.guild,
        me: {
          permissions: {
            has: jest.fn().mockReturnValue(true)
          }
        }
      },
      options: {
        data
      }
    } as unknown as CommandInteraction;

    const ban = new Ban();
    await ban.execute({ interaction: mock });

    expect(interactionMock.reply).toBeCalledWith({ content: "👮 O usuário foi banido 🚨." });
    expect(interactionMock.reply).toBeCalled();
  });

  it("Should return an error message if an unexpected error happens", async () => {
    const data = [
      {
        "type": "USER",
        "name": "member",
        user: jest.fn() as unknown as User
      }
    ] as CommandInteractionOption[];

    const mock = {
      ...interactionMock,
      memberPermissions: {
        has: jest.fn().mockReturnValue(true)
      },
      guild: {
        /* property .ban() does not exist */
        me: {
          permissions: {
            has: jest.fn().mockReturnValue(true)
          }
        }
      },
      options: {
        data
      }
    } as unknown as CommandInteraction;

    const ban = new Ban();
    await ban.execute({ interaction: mock });

    expect(interactionMock.reply).toBeCalledWith({ content: "Eu não posso banir esse membro 😕." });
    expect(interactionMock.reply).toBeCalled();
  });
});