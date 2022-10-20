import { GuildMember, Role } from "discord.js";
import { ICommand, ICommandProps } from "../typings/Commands";
import { ApplicationCommand } from "../typings/interaction";
import { ApplicationType, InteractionOptionType } from "../typings/interaction/enums";

class Roles implements ICommand {
  usage: string;
  enable: boolean;
  interaction: ApplicationCommand;

  constructor() {
    this.usage = "/role member role";
    this.enable = true;
    this.interaction = {
      name: "role",
      description: "Adicionar ou remover cargos.",
      type: ApplicationType.CHAT_INPUT,
      options: [
        {
          name: "add",
          name_localizations: {
            "pt-BR": "adicionar"
          },
          description: "Add a role to a member.",
          description_localizations: {
            "pt-BR":"Adicionar um cargo à um membro."
          },
          type: InteractionOptionType.SUB_COMMAND,
          options: [
            {
              name: "member",
              name_localizations: {
                "pt-BR": "membro"
              },
              description: "Member who will receive the role.",
              description_localizations: {
                "pt-BR": "Membro que irá receber o cargo."
              },
              type: InteractionOptionType.USER,
              required: true,
            },
            {
              name: "role",
              name_localizations: {
                "pt-BR": "cargo"
              },
              description: "Role to be add.",
              description_localizations: {
                "pt-BR": "Cargo à ser adicionado."
              },
              type: InteractionOptionType.ROLE,
              required: true,
            },
          ],
        },
        {
          name: "remove",
          name_localizations: {
            "pt-BR": "remover"
          },
          description: "Remove a member's role.",
          description_localizations: {
            "pt-BR": "Remover um cargo de um membro."
          },
          type: InteractionOptionType.SUB_COMMAND,
          options: [
            {
              name: "member",
              name_localizations: {
                "pt-BR": "membro"
              },
              description: "Member who will have the role removed.",
              description_localizations: {
                "pt-BR": "Membro que terá o cargo removido."
              },
              type: InteractionOptionType.USER,
              required: true,
            },
            {
              name: "role",
              name_localizations: {
                "pt-BR": "cargo"
              },
              description: "Role to be removed.",
              description_localizations: {
                "pt-BR": "Cargo à ser removido."
              },
              type: InteractionOptionType.ROLE,
              required: true,
            },
          ],
        },
      ]
    };
  }

  async execute({ interaction }: ICommandProps): Promise<void> {
    const options = interaction.options;

    if(options.data.length < 1) return interaction.reply({ content: `Como usar: **${this.usage}**` });

    const member = options.getMember("member");
    const role = options.getRole("role");

    if(!member) return interaction.reply({ content: "Mencione um usuário válido 🤷‍♀️." });
    if(!role) return interaction.reply({ content: "Mencione um cargo válido 🤷‍♀️." });

    if(!interaction.memberPermissions?.has('MANAGE_ROLES', true)) 
      return interaction.reply({ content: "🚨 Desculpe, você não tem permissão para usar esse comando." });
    
    try {
      switch(options.getSubcommand()) {
      case "add": 
        await this.add(member as GuildMember, role as Role);
  
        interaction.reply({ content: "✅ O cargo foi adicionado com sucesso!" });
        break;
      case "remove":
        await this.remove(member as GuildMember, role as Role);
  
        interaction.reply({ content: "❌ O cargo foi removido com sucesso!" });
        break;
      }
    } catch(error) {
      return interaction.reply({ content: "Eu não posso adicionar/remover esse cargo 😕." });
    }
  }

  async add(member: GuildMember, role: Role) {
    await member.roles.add(role);
  }

  async remove(member: GuildMember, role: Role) {
    await member.roles.remove(role);
  }
}

export default Roles;