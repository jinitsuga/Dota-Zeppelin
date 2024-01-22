const axios = require("axios");

const openDotaUrl = "https://api.opendota.com/api";

const getLiveGames = async () => {
  const reqResult = await fetch(`${openDotaUrl}/live`)
    .then((res) => res.json())
    .then((data) => {
      return data;
    })
    .catch((error) => {
      console.log(error);
    });

  const players = reqResult.map((game) => {
    let players = [];

    game.players.map((player) => {
      if (player.name) {
        players.push(player.name);
      }
    });
    return players;
  });

  console.log(players);

  const avgMmrs = reqResult.map((game) => game.average_mmr);
  return avgMmrs.sort((a, b) => b - a);
};

module.exports = { getLiveGames };
