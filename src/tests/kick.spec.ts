import { CommandInteraction, CommandInteractionOption } from "discord.js";
import Kick from "../commands/kick";
import { DiscordMock } from "../mock/discord";

const discordMock = new DiscordMock();
const interactionMock = discordMock.interaction;

describe("Kick Command", () => {
  it("Should return a message of how to use if there are no arguments", async () => {
    const kick = new Kick();
    await kick.execute({ interaction: interactionMock });

    expect(interactionMock.reply).toBeCalledWith({ content: `Como usar: **${kick.usage}**` });
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

    const kick = new Kick();
    await kick.execute({ interaction: mock });

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

    const kick = new Kick();
    await kick.execute({ interaction: mock });

    expect(mock.reply).toBeCalledWith({ content: "🚨 Desculpe, você não tem permissão para expulsar esse membro." });
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

    const kick = new Kick();
    await kick.execute({ interaction: mock });

    expect(mock.reply).toBeCalledWith({ content: "🚨 Desculpe, eu não tenho permissão para expulsar esse membro." });
    expect(mock.reply).toBeCalled();
  });

  it("Should be able to kick a member with an optional reason", async () => {
    const data = [
      {
        "type": "USER",
        "name": "member",
        user: discordMock.user
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
        },
      },
      options: {
        data
      }
    } as unknown as CommandInteraction;

    const kick = new Kick();
    await kick.execute({ interaction: mock });

    expect(mock.reply).toBeCalledWith({ content: "👮 O usuário foi removido do servidor 🚨." });
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

    expect(mock.reply).toBeCalledWith({ content: "Eu não posso expulsar esse membro 😕." });
    expect(mock.reply).toBeCalled();
  });
});