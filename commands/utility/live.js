const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const { getLiveGames } = require("../../utility/dotaApi");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("live")
    .setDescription("Gives info about the top games being played right now."),
  async execute(interaction) {
    const liveGames = await getLiveGames();

    // let gamesMessage = "";

    const games = liveGames.filter((game) => game.players.length).slice(0, 9);
    console.log("GAMES =>", games);
    // games.map((game, id) => {
    //   let gamePlayers = "";
    //   game.players.map((player, id) => {
    //     gamePlayers += `**${player.name}** as ${player.hero}${
    //       id === game.players.length - 1 ? "" : ", "
    //     }`;
    //   });
    //   const gameMsg = `Average mmr: ${game.avgMmr}. \n Players: ${gamePlayers}. \n Game: ${game.gameTime}min, score: ${game.score}`;
    //   gamesMessage += `${gameMsg} \n ${
    //     id !== games.length - 1 ? "--------------" : ""
    //   } \n`;
    // });

    // ----------------------

    const fields = [];

    for (let i = 0; i < 9; i++) {
      const game = games[i];
      console.log("first game", game);
      let gamePlayers = "";
      game.players.map((player, id) => {
        gamePlayers += `**${player.name}**(${player.hero})${
          id === game.players.length - 1 ? "" : ", "
        }`;
      });

      fields.push({
        name: ` Avg: ${game.avgMmr} :sun_with_face:`,
        value: `⏰: ${game.gameTime}min \n ⚔️: ${game.score} \n ${gamePlayers}`,
        inline: true,
      });
    }

    const embedObj = {
      color: 0x0099ff,
      title: "Top Live games",
      fields: fields,
    };
    const embed = new EmbedBuilder()
      .setColor(0x0099ff)
      .setTitle("Top live games")
      .addFields({
        name: "Avg mmr: 10400",
        value: "game data",
        inline: true,
      });

    await interaction.reply({ embeds: [embedObj] });
  },
};
