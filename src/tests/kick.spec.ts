import { CommandInteraction, CommandInteractionOption, User } from "discord.js";
import Kick from "../commands/kick";

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
      kick: jest.fn()
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

describe("Kick Command", () => {
  it("Should return a message of how to use if there are no arguments", async () => {
    const data = [] as CommandInteractionOption[];

    const mock = {
      ...interactionMock,
      options: {
        data,
      }
    } as unknown as CommandInteraction;

    const kick = new Kick();
    await kick.execute({ interaction: mock });

    expect(interactionMock.reply).toBeCalledWith({ content: `Como usar: **${kick.usage}**` });
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

    const kick = new Kick();
    await kick.execute({ interaction: mock });

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

    const kick = new Kick();
    await kick.execute({ interaction: mock });

    expect(interactionMock.reply).toBeCalledWith({ content: "🚨 Desculpe, você não tem permissão para expulsar esse membro." });
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

    const kick = new Kick();
    await kick.execute({ interaction: mock });

    expect(interactionMock.reply).toBeCalledWith({ content: "🚨 Desculpe, eu não tenho permissão para expulsar esse membro." });
    expect(interactionMock.reply).toBeCalled();
  });

  it("Should be able to kick a member with an optional reason", async () => {
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

    const kick = new Kick();
    await kick.execute({ interaction: mock });

    expect(interactionMock.reply).toBeCalledWith({ content: "👮 O usuário foi removido do servidor 🚨." });
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
        /* property .kick() does not exist */
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

    const kick = new Kick();
    await kick.execute({ interaction: mock });

    expect(interactionMock.reply).toBeCalledWith({ content: "Eu não posso expulsar esse membro 😕." });
    expect(interactionMock.reply).toBeCalled();
  });
});