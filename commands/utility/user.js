const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("user")
    .setDescription("gives data on given user"),
  async execute(interaction) {
    await interaction.reply(
      `This command was used by ${interaction.user.username}`
    );
  },
};
