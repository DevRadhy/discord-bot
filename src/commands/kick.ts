import { ICommand, ICommandProps } from "../typings/Commands";
import { ApplicationCommand } from "../typings/interaction";
import { ApplicationType, InteractionOptionType } from "../typings/interaction/enums";

class Kick implements ICommand {
  usage: string;
  enable: boolean;
  interaction: ApplicationCommand;

  constructor() {
    this.usage = "/kick member reason?";
    this.enable = true;
    this.interaction = {
      name: "kick",
      description: "Expulsar invasores do servidor.",
      type: ApplicationType.CHAT_INPUT,
      options: [
        {
          name: "member",
          name_localizations: {
            "pt-BR": "membro"
          },
          description: "Member to be kicked.",
          description_localizations: {
            "pt-BR": "Membro à ser expulso."
          },
          type: InteractionOptionType.USER,
          required: true,
        },
        {
          name: "reason",
          name_localizations: {
            "pt-BR": "rasão"
          },
          description: "Reason to kick this member.",
          description_localizations: {
            "pt-BR": "Rasão para expulsar esse membro."
          },
          type: InteractionOptionType.STRING,
          required: false,
        }
      ]
    };
  }

  async execute({ interaction }: ICommandProps): Promise<void> {
    const [ member, reason ] = interaction.options.data;

    if(interaction.options.data.length < 1) return interaction.reply({ content: `Como usar: **${this.usage}**` });

    if(!member.user) return interaction.reply({ content: "Mencione um usuário válido 🤷‍♀️." });

    const clientGuildMember = interaction.guild?.me;

    if(!interaction.memberPermissions?.has('KICK_MEMBERS', true)) return interaction.reply({ content: "🚨 Desculpe, você não tem permissão para expulsar esse membro." });
    if(!clientGuildMember?.permissions.has('KICK_MEMBERS', true)) return interaction.reply({ content: "🚨 Desculpe, eu não tenho permissão para expulsar esse membro." });

    try {
      await interaction.guild?.members.kick(member.user.id, reason ? String(reason.value) : '');

      return interaction.reply({ content: "👮 O usuário foi removido do servidor 🚨." });
    } catch(error) {
      return interaction.reply({ content: "Eu não posso expulsar esse membro 😕." });
    }
  }
}

export default Kick;