import { MessageEmbed } from "discord.js";
import { commands } from "..";
import { ICommand, ICommandProps } from "../typings/Commands";
import { ApplicationCommand } from "../typings/interaction";
import { ApplicationType } from "../typings/interaction/enums";

class Help implements ICommand {
  usage: string;
  enable: boolean;
  interaction: ApplicationCommand;

  constructor() {
    this.usage = "/help";
    this.enable = true;
    this.interaction = {
      name: "help",
      description: "Listar outros comandos.",
      type: ApplicationType.CHAT_INPUT
    };
  }

  async execute({ interaction }: ICommandProps): Promise<void> {
    const commandsFields = commands.map(({ interaction }) => ({ name: interaction.name, value: interaction.description, inline: true }));

    const embed = new MessageEmbed();

    embed.setTitle("⁉️ Ajuda");
    embed.setDescription(this.interaction.description);
    embed.setColor("#5f3bff");
    embed.addFields(commandsFields);
    embed.setFooter({
      text: `Pedido por ${interaction.member?.user.username}`,
      iconURL: interaction.user.avatarURL({ format: 'png' }) ?? '',
    });
    embed.setTimestamp();

    await interaction.reply({ embeds: [ embed ] });
  }
}

export default Help;