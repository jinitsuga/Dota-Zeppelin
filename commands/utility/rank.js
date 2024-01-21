const { SlashCommandBuilder } = require("discord.js");
const { getGuildRanks } = require("../../utility/guilds");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("rank")
    .setDescription("Shows members ranked by coins earned."),
  async execute(interaction) {
    const guildId = interaction.guildId;
    const ranks = await getGuildRanks(guildId);

    let guildRanks = "";

    if (ranks.length > 0) {
      ranks.map((member) => {
        guildRanks += `${member} \n`;
      });
    }

    if (ranks.length <= 0) {
      await interaction.reply("No tipping has been done yet.");
    } else {
      await interaction.reply(guildRanks);
    }
  },
};
