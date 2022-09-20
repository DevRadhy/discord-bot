import { ICommand, ICommandProps } from "../typings/Commands";
import { MessageEmbed } from 'discord.js';
import { ApplicationCommand } from "../typings/interaction";
import { ApplicationType } from "../typings/interaction/enums";

const { prefix, rules: rulesJSON } = require("../../data/rules.json");

interface IRulesProps {
  name: string,
  description: string;
}

class Rules implements ICommand {
  usage: string;
  enable: boolean;
  interaction: ApplicationCommand;

  constructor() {
    this.usage = "/rules";
    this.enable = true;
    this.interaction = {
      name: "rules",
      description: "Mostrar as regras.",
      type: ApplicationType.CHAT_INPUT
    };
  }

  async execute({ interaction }: ICommandProps): Promise<void> {
    const rules = rulesJSON.map((rule: IRulesProps) => ({ name: `${prefix} ${rule.name}`, value: rule.description }));

    const embed = new MessageEmbed();
  
    embed.setTitle("⁉️ Regras");
    embed.setColor("#5f3bff");
    embed.addFields(rules);
  
    interaction.reply({ embeds: [embed] });
  }
}

export default Rules;