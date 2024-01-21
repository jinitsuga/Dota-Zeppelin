const { SlashCommandBuilder } = require("discord.js");
const {
  tipUser,
  removeUsable,
  checkAvailableCoins,
} = require("../../utility/tipHandler");

const tipMessages = [
  "Nice one! :coin:",
  "Well played! :coin:",
  "LOL nice. :joy:",
  "Keep it up. :sunglasses:",
  "You're on fire! Not literally, though. Safety first. :bubbles: :fire_extinguisher:",
  "Epic moves! :tophat:",
  "You're a wizard, Harry! :mage:",
  "Tip-tastic skills! :sparkles:",
];

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

    if (recipient.bot == true) {
      await interaction.reply("That's a bot (:robot:). :sun_with_face:");
    } else if (recipient == sender) {
      await interaction.reply(
        `${recipient.globalName} just tried tipping themselves. ???? :rofl:`
      );
    } else if (!hasCoins) {
      await interaction.reply(
        "Not enough coins. Wait for the daily refresh or play some Dota instead. :tada:"
      );
    } else {
      const randomMsg =
        tipMessages[Math.floor(Math.random() * tipMessages.length)];

      await tipUser(recipient.username, guildId, recipient.globalName);
      await removeUsable(sender.username, guildId, sender.globalName);
      await interaction.reply(
        `${sender.globalName} tipped ${recipient.globalName}. ${randomMsg}`
      );
    }
  },
};
