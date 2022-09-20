import { Client, Intents } from "discord.js";

export default {
  client: new Client({
    intents: [ Intents.FLAGS.GUILDS ]
  })
};