import { CommandInteraction, CommandInteractionOption, GuildMember, Interaction, User } from "discord.js";
import Role from "../commands/role";
import { DiscordMock } from "../mock/discord";

const discordMock = new DiscordMock();
const interactionMock = discordMock.interaction;

console.log(discordMock.member.roles)

describe('Role Command', () => {
  it('Should return a message on how to use', async () => {
    const mock = {
      ...interactionMock,
    } as unknown as CommandInteraction;

    const role = new Role();
    await role.execute({ interaction: mock });

    expect(interactionMock.reply).toHaveBeenCalled();
    expect(interactionMock.reply).toHaveBeenCalledWith({ content: `Como usar: **${role.usage}**` });
  });

  it('Should return a message asking about the member', async () => {
    const data = [ {} ] as CommandInteractionOption[];

    const mock = {
      ...interactionMock,
      options: {
        ...interactionMock.options,
        data,
      }
    } as unknown as CommandInteraction;

    const role = new Role();
    await role.execute({ interaction: mock });

    expect(mock.reply).toHaveBeenCalled();
    expect(mock.reply).toHaveBeenCalledWith({ content: "Mencione um usuário válido 🤷‍♀️." });
  });

  it('Should return a message asking about the role', async () => {
    const data = [
      {
        type: "USER",
        name: "member",
        user: discordMock.user
      }
    ] as CommandInteractionOption[];

    const mock = {
      ...interactionMock,
      options: {
        ...interactionMock.options,
        data,
        getMember: jest.fn().mockReturnValue(discordMock.member)
      }
    } as unknown as CommandInteraction;

    const role = new Role();
    await role.execute({ interaction: mock });

    expect(mock.reply).toHaveBeenCalled();
    expect(mock.reply).toHaveBeenCalledWith({ content: "Mencione um cargo válido 🤷‍♀️." });
  });

  it('Should return a message saying that the author does not have permission', async () => {
    const data = [
      {
        "type": "USER",
        "name": "member",
        user: discordMock.user
      },
      {
        "type": "ROLE",
        "name": "role",
        role: discordMock.role
      }
    ] as CommandInteractionOption[];

    const mock = {
      ...interactionMock,
      memberPermissions: {
        has: jest.fn()
      },
      options: {
        ...interactionMock.options,
        data,
        getMember: jest.fn().mockReturnValue(discordMock.member),
        getRole: jest.fn().mockReturnValue(discordMock.role)
      }
    } as unknown as CommandInteraction;

    const role = new Role();
    await role.execute({ interaction: mock });

    expect(mock.reply).toHaveBeenCalledWith({ content: "🚨 Desculpe, você não tem permissão para usar esse comando." });
    expect(mock.reply).toHaveBeenCalled();
  });

  it('Should return a sucess message to add role', async () => {
    const data = [
      {
        "type": "USER",
        "name": "member",
        user: discordMock.user
      },
      {
        "type": "ROLE",
        "name": "role",
        role: discordMock.role
      }
    ] as CommandInteractionOption[];

    const mock = {
      ...interactionMock,
      memberPermissions: {
        has: jest.fn().mockReturnValue(true)
      },
      options: {
        ...interactionMock.options,
        data,
        getMember: jest.fn().mockReturnValue({
          roles: {
            add: jest.fn()
          }
        }),
        getRole: jest.fn().mockReturnValue(discordMock.role),
        getSubcommand: jest.fn().mockReturnValue("add"),
      }
    } as unknown as CommandInteraction;

    const role = new Role();
    await role.execute({ interaction: mock });

    expect(mock.reply).toHaveBeenCalledWith({ content: "✅ O cargo foi adicionado com sucesso!" });
    expect(mock.reply).toHaveBeenCalled();
  });

  it('Should return a sucess message to remove role', async () => {
    const data = [
      {
        "type": "USER",
        "name": "member",
        user: discordMock.user
      },
      {
        "type": "ROLE",
        "name": "role",
        role: discordMock.role
      }
    ] as CommandInteractionOption[];

    const mock = {
      ...interactionMock,
      memberPermissions: {
        has: jest.fn().mockReturnValue(true)
      },
      options: {
        ...interactionMock.options,
        data,
        getMember: jest.fn().mockReturnValue({
          roles: {
            remove: jest.fn()
          }
        }),
        getRole: jest.fn().mockReturnValue(discordMock.role),
        getSubcommand: jest.fn().mockReturnValue("remove"),
      }
    } as unknown as CommandInteraction;

    const role = new Role();
    await role.execute({ interaction: mock });

    expect(mock.reply).toHaveBeenCalledWith({ content: "❌ O cargo foi removido com sucesso!" });
    expect(mock.reply).toHaveBeenCalled();
  });

  it('Should return a error message', async () => {
    const data = [
      {
        "type": "USER",
        "name": "member",
        user: discordMock.user
      },
      {
        "type": "ROLE",
        "name": "role",
        role: discordMock.role
      }
    ] as CommandInteractionOption[];

    const mock = {
      ...interactionMock,
      memberPermissions: {
        has: jest.fn().mockReturnValue(true)
      },
      options: {
        ...interactionMock.options,
        data,
        getMember: jest.fn().mockReturnValue(discordMock.member),
        getRole: jest.fn().mockReturnValue(discordMock.role),
        getSubcommand: jest.fn().mockReturnValue("add"), // member does not have roles add method
      }
    } as unknown as CommandInteraction;

    const role = new Role();
    await role.execute({ interaction: mock });

    expect(mock.reply).toHaveBeenCalledWith({ content: "Eu não posso adicionar/remover esse cargo 😕." });
    expect(mock.reply).toHaveBeenCalled();
  });
})