import { MessageEmbed } from "discord.js";
import { ICommand, ICommandProps } from "../typings/Commands";
import { ApplicationCommand } from "../typings/interaction";
import { ApplicationType } from "../typings/interaction/enums";

class Social implements ICommand {
  usage: string;
  enable: boolean;
  interaction: ApplicationCommand;

  constructor() {
    this.usage = "/social";
    this.enable = true;
    this.interaction = {
      name: "social",
      description: "Listar links relacionados ao projeto.",
      type: ApplicationType.CHAT_INPUT
    };
  }

  async execute({ interaction }: ICommandProps): Promise<void> {
    const embed = new MessageEmbed();

    embed.setTitle("⭐ Social");

    embed.setDescription(`Aqui está alguns links relacionados ao bot.
    \n**Links:
    \n🐱 [Github](https://github.com/DevRadhy/)
    \n🙋‍♀️ [Discord](https://discord.com/)**`);

    embed.setColor("#5f3bff");
    embed.setFooter({
      text: `Pedido por ${interaction.member?.user.username}`,
      iconURL: interaction.user.avatarURL({ format: 'png' }) ?? '',
    });
    embed.setTimestamp();

    interaction.reply({ embeds: [ embed ] });
  }
}

export default Social;