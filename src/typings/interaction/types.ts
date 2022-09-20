import { InteractionOptions } from ".";
import { InteractionOptionBase } from "./base";
import { InteractionOptionType } from "./enums";

export interface InteractionOptionTypeSubCommand extends InteractionOptionBase<InteractionOptionType.SUB_COMMAND> {
  options?: InteractionOptions[]
}

export interface InteractionOptionTypeSubCommandGroup extends InteractionOptionBase<InteractionOptionType.SUB_COMMAND_GROUP> {
  options?: InteractionOptionTypeSubCommand[];
}

export type InteractionOptionTypeBoolean = InteractionOptionBase<InteractionOptionType.BOOLEAN>;
export type InteractionOptionTypeUser = InteractionOptionBase<InteractionOptionType.USER>;
export type InteractionOptionTypeChannel = InteractionOptionBase<InteractionOptionType.CHANNEL>;
export type InteractionOptionTypeRole = InteractionOptionBase<InteractionOptionType.ROLE>;
export type InteractionOptionTypeMentionable = InteractionOptionBase<InteractionOptionType.MENTIONABLE>;
export type InteractionOptionTypeAttachment = InteractionOptionBase<InteractionOptionType.ATTACHMENT>;