const { Events } = require("discord.js");

module.exports = {
  name: Events.InteractionCreate,
  async execute(interaction) {
    if (!interaction.isChatInputCommand()) return;
    console.log(interaction);

    // via get method from Collection class since client.commands ia a new Collection (line 19)
    const command = interaction.client.commands.get(interaction.commandName);

    if (!command) {
      console.error(`No ${interaction.commandName} was found.`);
      return;
    }

    try {
      await command.execute(interaction);
    } catch (error) {
      console.error(error);
      if (interaction.replied || interaction.deferred) {
        await interaction.followUp({
          content: "Error while executing this command",
          ephemeral: true,
        });
      } else {
        await interaction.reply({
          content: "Error executing this command",
          ephemeral: true,
        });
      }
    }
  },
};
