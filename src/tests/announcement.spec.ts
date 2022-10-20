import { CommandInteraction, CommandInteractionOption } from "discord.js";
import Announcement from "../commands/announcement";
import { DiscordMock } from "../mock/discord";

const discordMock = new DiscordMock();
const interactionMock = discordMock.interaction;

describe('Announcement Command', () => {
  it('Should return a message on how to use', async () => {
    const announcement = new Announcement();
    await announcement.execute({ interaction: interactionMock });

    expect(interactionMock.reply).toHaveBeenCalled();
    expect(interactionMock.reply).toHaveBeenCalledWith({ content: `Como usar: **${announcement.usage}**` });
  });

  it('Should return a message asking about the channel', async () => {
    const data = [
      {},
      {
        "type": 3,
        "name": "message",
        "value": ""
      }
    ];

    const mock = {
      ...interactionMock,
      options: {
        data,
      }
    } as unknown as CommandInteraction;

    const announcement = new Announcement();
    await announcement.execute({ interaction: mock });

    expect(mock.reply).toHaveBeenCalled();
    expect(mock.reply).toHaveBeenCalledWith({ content: "Eu não consegui encontrar esse canal. 😕" });

    const dataWithChannel = [
      {
        "type": 7,
        "name": "channel",
        channel: {
          type: "GUILD_TEXT"
        }
      },
      {
        "type": 3,
        "name": "message",
        "value": ""
      }
    ];

    const mockWithChannel = {
      ...interactionMock,
      options: {
        data: dataWithChannel,
      }
    } as unknown as CommandInteraction;

    await announcement.execute({ interaction: mockWithChannel });

    expect(mockWithChannel.reply).toHaveBeenCalled();
    expect(mockWithChannel.reply).not.toHaveBeenLastCalledWith({ content: "Eu não consegui encontrar esse canal. 😕" });
  });

  it('Should return a error message if the channel is not a text channel', async () => {
    const data = [
      {
        "type": 7,
        "name": "cardname",
        channel: {
          type: "GUILD_VOICE"
        }
      }
    ];

    const mock = {
      ...interactionMock,
      options: {
        data,
      }
    } as unknown as CommandInteraction;

    const announcement = new Announcement();
    await announcement.execute({ interaction: mock });

    expect(mock.reply).toHaveBeenCalled();
    expect(mock.reply).toHaveBeenCalledWith({ content: "Desculpe, você precisa mencionar um canal de texto. 😕" });
  });

  it('Should return a message asking about the announcement message', async () => {
    const data = [
      {
        "type": 7,
        "name": "channel",
        channel: {
          type: "GUILD_TEXT"
        }
      },
      {
        "type": 3,
        "name": "message",
        "value": ""
      }
    ];

    const mock = {
      ...interactionMock,
      options: {
        data,
      }
    } as unknown as CommandInteraction;

    const announcement = new Announcement();
    await announcement.execute({ interaction: mock });

    expect(mock.reply).toHaveBeenCalled();
    expect(mock.reply).toHaveBeenCalledWith({ content: "✍️ Desculpe, você precisa escrever algo." });
  });

  it('Should return the annunciation message', async () => {
    const data = [
      {
        "type": 7,
        "name": "channel",
        channel: {
          type: "GUILD_TEXT",
          send: jest.fn()
        }
      },
      {
        "type": 3,
        "name": "message",
        "value": "some announcement message."
      }
    ];

    const mock = {
      ...interactionMock,
      options: {
        data,
      }
    } as unknown as CommandInteraction;

    const announcement = new Announcement();
    await announcement.execute({ interaction: mock });

    expect(data[0].channel?.send).toHaveBeenCalled();

    expect(mock.reply).toHaveBeenCalledWith({ content: "Mensagem enviada com sucesso!", ephemeral: true });
    expect(mock.reply).toHaveBeenCalled();
  });
});