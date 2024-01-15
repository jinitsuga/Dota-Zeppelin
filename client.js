require("dotenv").config();
const { Client, Collection, Events, GatewayIntentBits } = require("discord.js");

let client = "";

const startClient = (async () => {
  client = new Client({
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages],
  });

  const token = process.env.DISCORD_TOKEN;
  console.log(token);

  client.login(token);
  return client;
})();
module.exports = { client };
