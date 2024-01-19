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

    const hasCoins = await checkAvailableCoins(sender.username, guildId);

    if (recipient == sender) {
      await interaction.reply(
        `${recipient.globalName} just tried tipping themselves. ???? :rofl:`
      );
    } else if (!hasCoins) {
      await interaction.reply(
        "Not enough coins. Wait for the daily refresh or play some Dota instead. :tada:"
      );
    } else {
      await tipUser(recipient.username, guildId);
      await removeUsable(sender.username, guildId);
      await interaction.reply(`Tip sent to ${recipient.globalName}. :coin:`);
    }
  },
};
