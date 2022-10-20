import { CommandInteraction, CommandInteractionOption } from "discord.js";
import Ban from "../commands/ban";
import { DiscordMock } from "../mock/discord";

const discordMock = new DiscordMock();
const interactionMock = discordMock.interaction;

describe("Ban Command", () => {
  it("Should return a message of how to use if there are no arguments", async () => {
    const ban = new Ban();
    await ban.execute({ interaction: interactionMock });

    expect(interactionMock.reply).toBeCalledWith({ content: `Como usar: **${ban.usage}**` });
    expect(interactionMock.reply).toBeCalled();
  });

  it("Should return an error message if the user is not valid", async () => {
    const data = [ {} ] as CommandInteractionOption[];

    const mock = {
      ...interactionMock,
      options: {
        data
      }
    } as unknown as CommandInteraction;

    const ban = new Ban();
    await ban.execute({ interaction: mock });

    expect(mock.reply).toBeCalledWith({ content: "Mencione um usuário válido 🤷‍♀️." });
    expect(mock.reply).toBeCalled();
  });

  it("Should return an error message if the author does not have permission", async () => {
    const data = [
      {
        "type": "USER",
        "name": "member",
        user: discordMock.user
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

    expect(mock.reply).toBeCalledWith({ content: "🚨 Desculpe, você não tem permissão para banir esse membro." });
    expect(mock.reply).toBeCalled();
  });

  it("Should return an error message if the client does not have permission", async () => {
    const data = [
      {
        "type": "USER",
        "name": "member",
        user: discordMock.user
      }
    ] as CommandInteractionOption[];

    const mock = {
      ...interactionMock,
      memberPermissions: {
        has: jest.fn().mockReturnValue(true)
      },
      options: {
        data
      }
    } as unknown as CommandInteraction;

    const ban = new Ban();
    await ban.execute({ interaction: mock });

    expect(mock.reply).toBeCalledWith({ content: "🚨 Desculpe, eu não tenho permissão para banir esse membro." });
    expect(mock.reply).toBeCalled();
  });

  it("Should be able to ban a member with an optional reason", async () => {
    const data = [
      {
        "type": "USER",
        "name": "member",
        user: discordMock
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

    expect(mock.reply).toBeCalledWith({ content: "👮 O usuário foi banido 🚨." });
    expect(mock.reply).toBeCalled();
  });

  it("Should return an error message if an unexpected error happens", async () => {
    const data = [
      {
        "type": "USER",
        "name": "member",
        user: discordMock.user
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

    expect(mock.reply).toBeCalledWith({ content: "Eu não posso banir esse membro 😕." });
    expect(mock.reply).toBeCalled();
  });
});