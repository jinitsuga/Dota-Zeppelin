const { SlashCommandBuilder } = require("discord.js");
const { getLiveGames } = require("../../utility/dotaApi");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("live")
    .setDescription("Gives info about the top games being played right now."),
  async execute(interaction) {
    const liveGames = await getLiveGames();

    let gamesMessage = "";

    const games = liveGames.filter((game) => game.players.length).slice(0, 8);

    games.map((game, id) => {
      let gamePlayers = "";
      game.players.map((player, id) => {
        gamePlayers += `**${player.name}** as ${player.hero}${
          id === game.players.length - 1 ? "" : ", "
        }`;
      });
      const gameMsg = `Average mmr: ${game.avgMmr}. \n Players: ${gamePlayers}. \n Game: ${game.gameTime}min, score: ${game.score}`;
      gamesMessage += `${gameMsg} \n ${
        id !== games.length - 1 ? "--------------" : ""
      } \n`;
    });

    await interaction.reply(gamesMessage);
  },
};
