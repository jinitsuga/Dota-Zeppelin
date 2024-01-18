const { SlashCommandBuilder } = require("discord.js");
const {
  tipUser,
  removeUsable,
  checkAvailableCoins,
} = require("../../utility/tipHandler");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("tip")
    .setDescription("Tip other members.")
    .addUserOption((option) =>
      option.setName("user").setDescription("tip recipient").setRequired(true)
    ),
  async execute(interaction) {
    const recipient = interaction.options._hoistedOptions[0].user;

    const sender = interaction.user;

    const guildId = interaction.guildId;

    if (recipient == sender) {
      await interaction.reply(
        `${recipient.globalName} just tried tipping themselves. ???? :rofl:`
      );
    } else {
      await tipUser(recipient.username, guildId);
      await removeUsable(sender.username, guildId);
      await interaction.reply(`Tip sent to ${recipient.globalName}. :coin:`);
    }
  },
};
