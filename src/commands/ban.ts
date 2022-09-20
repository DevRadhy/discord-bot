import { ICommand, ICommandProps } from "../typings/Commands";
import { ApplicationCommand } from "../typings/interaction";
import { ApplicationType, InteractionOptionType } from "../typings/interaction/enums";

class Ban implements ICommand {
  usage: string;
  enable: boolean;
  interaction: ApplicationCommand;

  constructor() {
    this.usage = "/ban member days? reason?";
    this.enable = true;
    this.interaction = {
      name: "ban",
      description: "Banir invasores do servidor.",
      type: ApplicationType.CHAT_INPUT,
      options: [
        {
          name: "member",
          name_localizations: {
            "pt-BR": "membro"
          },
          description: "Member to be banned.", 
          description_localizations: {
            "pt-BR": "Membro à ser banido."
          },
          type: InteractionOptionType.USER,
          required: true,
        },
        {
          name: "days",
          name_localizations: {
            "pt-BR": "dias"
          },
          description: "Ban days.",
          description_localizations: {
            "pt-BR": "Dias de banimento."
          },
          type: InteractionOptionType.INTEGER,
          required: false,
        },
        {
          name: "reason",
          name_localizations: {
            "pt-BR": "rasão"
          },
          description: "Ban reason.",
          description_localizations: {
            "pt-BR": "Rasão do banimento."
          },
          type: InteractionOptionType.STRING,
          required: false,
        }
      ]
    };
  }

  async execute({ interaction }: ICommandProps): Promise<void> {
    const [ member, days, reason ] = interaction.options.data;

    if(interaction.options.data.length < 1) return interaction.reply({ content: `Como usar: **${this.usage}**` });

    if(!member.user) return interaction.reply({ content: "Mencione um usuário válido 🤷‍♀️." });

    const clientGuildMember = interaction.guild?.me;

    if(!interaction.memberPermissions?.has('BAN_MEMBERS', true)) return interaction.reply({ content: "🚨 Desculpe, você não tem permissão para expulsar esse membro." });
    if(!clientGuildMember?.permissions.has('BAN_MEMBERS', true)) return interaction.reply({ content: "🚨 Desculpe, eu não tenho permissão para expulsar esse membro." });

    try {
      await interaction.guild?.members.ban(member.user,
        {
          days: days ? Number(days.value) : 0,
          reason: reason ? String(reason.value) : ''
        });

      return interaction.reply({ content: "👮 O usuário foi banido 🚨." });
    } catch(error) {
      return interaction.reply({ content: "Eu não posso banir esse membro 😕." });
    }
  }
}

export default Ban;