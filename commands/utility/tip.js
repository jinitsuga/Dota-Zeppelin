const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("tip")
    .setDescription("Tip other members.")
    .addUserOption((option) =>
      option.setName("user").setDescription("tip recipient").setRequired(true)
    ),
  async execute(interaction) {
    const recipient = interaction.options._hoistedOptions[0].user;

    await interaction.reply(`tip sent to ${recipient.username}`);
  },
};
