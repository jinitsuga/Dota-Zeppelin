const { SlashCommandBuilder } = require("discord.js");
const { tipUser } = require("../../utility/tipHandler");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("tip")
    .setDescription("Tip other members.")
    .addUserOption((option) =>
      option.setName("user").setDescription("tip recipient").setRequired(true)
    ),
  async execute(interaction) {
    const recipient = interaction.options._hoistedOptions[0].user;
    console.log("the user using command =>", interaction.user);

    if (recipient == interaction.user) {
      tipUser(recipient.username, interaction.guildId);

      await interaction.reply(
        `${recipient.globalName} just tried tipping themselves. ???? :rofl:`
      );
    } else {
      tipUser(recipient.username, interaction.guildId);
      await interaction.reply(`Tip sent to ${recipient.globalName}. :coin:`);
    }
  },
};
