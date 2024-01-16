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
    // console.log(recipient);
    if (recipient == interaction.user) {
      await interaction.reply(
        `${recipient.globalName} just tried tipping themselves. ???? :rofl:`
      );
    } else {
      await interaction.reply(`Tip sent to ${recipient.globalName}. :coin:`);
    }
  },
};
