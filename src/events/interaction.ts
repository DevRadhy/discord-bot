import { Interaction } from "discord.js";
import { ICommand } from "../typings/Commands";

class InteractionEvent {
  constructor(interaction: Interaction, commands: ICommand[]) {
    if(!interaction.isCommand()) return;
    if(interaction.member?.user.bot) return;
    if(interaction.isRepliable() == false) return;

    const interactionCommand = interaction.commandName;
    
    const commandInstance = commands.find(({ interaction }) => interaction.name === interactionCommand);
    
    if(!commandInstance?.enable) return;
    
    commandInstance.execute({ interaction });
  }
}

export default InteractionEvent;