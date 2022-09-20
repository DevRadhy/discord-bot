import { CategoryChannelResolvable, Guild, OverwriteResolvable } from "discord.js";

export interface IChannelCreate {
  guild: Guild;
  category: CategoryChannelResolvable;
  channelName: string;
  limit: number;
  membersPermissions: OverwriteResolvable[];
}