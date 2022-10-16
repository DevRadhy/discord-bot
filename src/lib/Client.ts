import { Client, Intents } from "discord.js";
import * as functions from '../commands';

export default {
  client: new Client({
    intents: [ Intents.FLAGS.GUILDS ]
  }),

  commands: Object.values(functions).map((command) => new command())
};