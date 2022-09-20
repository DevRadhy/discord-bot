/* eslint-disable no-unused-vars */
import { CommandInteraction } from "discord.js";
import { ApplicationCommand } from "./interaction";

export interface ICommandsDetails {
  usage: string;
  enable: boolean;
  interaction: ApplicationCommand;
}

export interface ICommandProps {
  interaction: CommandInteraction;
}

export interface ICommand extends ICommandsDetails {
  execute(props: ICommandProps): Promise<void>;
}

export interface ICommands {
  new (): ICommand;
}