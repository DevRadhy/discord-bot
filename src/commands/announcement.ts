import { MessageEmbed } from "discord.js";
import { ICommand, ICommandProps } from "../typings/Commands";
import { ApplicationCommand } from "../typings/interaction";
import { ApplicationType, InteractionOptionType } from "../typings/interaction/enums";

class Announcement implements ICommand {
  usage: string;
  enable: boolean;
  interaction: ApplicationCommand;
  
  constructor() {
    this.usage = "/anuncio #channel message";
    this.enable = true;
    this.interaction = {
      name: "announcement",
      description: "Fazer um anúncio a todos.",
      type: ApplicationType.CHAT_INPUT,
      options: [
        {
          name: "channel",
          name_localizations: {
            "pt-BR": "canal"
          },
          description: "Channel where a message will be send.",
          description_localizations: {
            "pt-BR": "Canal onde será enviado a mensagem."
          },
          type: InteractionOptionType.CHANNEL,
          required: true,
        },
        {
          name: "message",
          name_localizations: {
            "pt-BR": "mensagem"
          },
          description: "Message to be sent.",
          description_localizations: {
            "pt-BR": "Mensagem à ser enviada."
          },
          type: InteractionOptionType.STRING,
          required: true,
        },
      ]
    };
  }

  async execute({ interaction }: ICommandProps): Promise<void> {
    const [ channelOption, message ] = interaction.options.data;
    
    if(interaction.options.data.length < 1) return interaction.reply({ content: `Como usar: **${this.usage}**` });
    
    const channel = channelOption?.channel;

    if(!channel) return interaction.reply({ content: "Eu não consegui encontrar esse canal. 😕" });
    if(channel?.type !== "GUILD_TEXT") return interaction.reply({ content: "Desculpe, você precisa mencionar um canal de texto. 😕" });

    if(!message?.value) return interaction.reply({ content: "✍️ Desculpe, você precisa escrever algo." });

    const embed = new MessageEmbed();

    embed.setTitle("📢 Anúncio");
    embed.setDescription(`${message.value}`);
    embed.setColor("#5f3bff");
    embed.setFooter({
      text: `Enviado por ${interaction.user.username}`,
      iconURL: interaction.user.avatarURL({ format: 'png' }) ?? '',
    });
    embed.setTimestamp();

    await channel.send({ embeds: [ embed ] });
    await interaction.reply({ content: "Mensagem enviada com sucesso!", ephemeral: true });
  }
}

export default Announcement;