import { ActivityOptions } from "discord.js";
import Client from "./lib/Client";
import { REST } from '@discordjs/rest';
import { Routes } from 'discord-api-types/v9';

import InteractionEvent from "./events/interaction";

const { client, commands } = Client;

const interactions = commands.map((command) => command.interaction);

const rest = new REST({ version: '9' }).setToken(String(process.env.SECRET_TOKEN));

(async () => {
  try {
    console.log('Started refreshing application (/) commands.');

    await rest.put(
      Routes.applicationGuildCommands('1014260221486583849', '971159806197002282'),
      { body: interactions },
    );

    console.log('Successfully reloaded application (/) commands.');
  } catch (error) {
    console.error(error);
  }
})();

client.on('ready', () => {
  const status: ActivityOptions[] = [
    { name: 'Seja bem-vindo(a)', type: "PLAYING" },
    { name: 'Você caça um milhão de vagalumes pela pessoa, e ela não caça um mosquito por você. 🥲', type: "PLAYING" },
    { name: 'Se estiver entediado lave a louça, e se não estiver lave mesmo assim. Assinado, Mãe. 🥰', type: "PLAYING" },
    { name: 'Houve boatos de que eu estava na pior... Podem confirmar os boatos! 🥲', type: "STREAMING", url: "#" },
    { name: '"A vida é feita de escolhas". Engraçado, eu escolhi ser rico e até agora nada!', type: "PLAYING" },
    { name: 'O que seria da humanidade se não existisse o print?', type: "PLAYING" },
    { name: 'Se a vida estiver muito amarga, dá uma rebolada. Às vezes o açúcar tá no fundo.', type: "LISTENING" },
    { name: 'Tudo na vida passa, menos a vontade de ganhar dinheiro dormindo. 💤', type: "PLAYING" },
    { name: 'Não me jogue indiretas. Me jogue dinheiro.', type: "PLAYING" },
    { name: 'Doi deitar no sofá e lembrar que esqueceu o controle. 🥲', type: "WATCHING" },
    { name: 'Fui procurar o que era melhor pra mim e abri a geladeira. 🍔', type: "PLAYING" },
    { name: 'Pizza é vida! 🍕', type: "PLAYING" },
    { name: 'Na vida, assim como na geladeira: o que está no interior é que importa. 💕', type: "PLAYING" },
    { name: 'Na minha situação atual, se eu for cortar uma cebola, é ela que chora. 😆😅🤣', type: "WATCHING" },
    { name: 'Na frase "ele acordou cedo", o sujeito se encontra… Com sono. 💤', type: "WATCHING" },
  ];

  function setActivity() {
    const randomStatus = status[Math.floor(Math.random() * status.length)];

    client.user?.setActivity(randomStatus);
  }

  setInterval(setActivity, 60000);
});

client.on('interactionCreate', async (interaction) => {
  new InteractionEvent(interaction, commands);
});

client.login(process.env.SECRET_TOKEN);