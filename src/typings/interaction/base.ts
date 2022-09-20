import { PermissionFlags } from "discord.js";
import { InteractionOptions } from ".";
import { ApplicationType, InteractionOptionType, LocalizationMap } from "./enums";

export interface InteractionOptionChoices<ValueType = string | number> {
  name: string;
  name_lolizations?: LocalizationMap | null;
  value: ValueType;
}

export interface InteractionOptionBase<Type extends InteractionOptionType> {
  type: Type;
  name: string;
  name_localizations?: LocalizationMap | null;
  description: string;
  description_localizations?: LocalizationMap | null;
  required?: boolean;
}

export interface InteractionCommandBase<Type extends ApplicationType> {
  type: Type;
  name: string;
  name_localizations?: LocalizationMap | null;
  description: string;
  description_localizations?: LocalizationMap | null;
}

type SnowFlake = string;

export interface ApplicationCommandBase {
  id: SnowFlake
  /**
   * @default CHAT_INPUT
   */
  type?: ApplicationType;
  application_id: SnowFlake
  guild_id?: SnowFlake
  name: string;
  name_localizations?: LocalizationMap | null;
  description: string;
  description_localizations?: LocalizationMap | null;
  options?: InteractionOptions[]
  default_member_permissions?: Partial<keyof PermissionFlags>[];
  dm_permission?: boolean;
  /**
   * @deprecated Not recommended for use as field will soon be deprecated. Indicates whether the command is enabled by default when the app is added to a guild, defaults to true
   * @default true
    */
  default_permission?: boolean;
  version: SnowFlake;
}