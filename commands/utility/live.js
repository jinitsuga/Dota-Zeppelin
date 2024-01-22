const { SlashCommandBuilder } = require("discord.js");
const { getLiveGames } = require("../../utility/dotaApi");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("live")
    .setDescription("Gives info about the top games being played right now."),
  async execute(interaction) {
    const liveGames = await getLiveGames();

    console.log(liveGames);

    await interaction.reply("Here go live games.");
  },
};
