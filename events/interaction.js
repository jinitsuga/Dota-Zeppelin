const { Events, PermissionFlagsBits } = require("discord.js");

const { client } = require("../client");

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
      const guild = await client.guilds.fetch(interaction.guildId);

      const recipient = interaction.options._hoistedOptions[0]?.user;
      const channel = interaction.channelId;
      console.log(
        guild.members.me
          .permissionsIn(channel)
          .has(PermissionFlagsBits.SendMessages)
      );

      if (command.data.name == "tip") {
        console.log(`tip recipient: ${recipient.username}`);
      }
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
