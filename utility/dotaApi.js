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

  const sortedGames = reqResult.sort((a, b) => b.average_mmr - a.average_mmr);
  const byMmr = sortedGames.filter((game) => game.deactivate_time === 0);

  console.log(byMmr);

  let gamesData = [];

  for (let i; i < byMmr.length; i++) {
    const gameData = { players: [] };

    byMmr[i].players.map((player) => {
      if (player.name) {
        gameData.players.push({ name: player.name, hero: player.hero_id });
      }
    });

    if (gameData.players.length) {
      const rightNow = new Date();
      const gameStart = new Date(game.last_update_time * 1000);
      const lastUpdate = Math.floor(
        (rightNow.getTime() - gameStart.getTime()) / 1000 / 60
      );

      gameData.avgMmr = game.average_mmr;
      gameData.lastUpdate = lastUpdate;
      gameData.gameTime = Math.ceil(game.game_time / 60);
    }
    gamesData.push(gameData);
  }

  // const gamesData = byMmr.map((game) => {
  //   const gameData = { players: [] };

  //   game.players.map((player) => {
  //     if (player.name) {
  //       gameData.players.push(player.name);
  //     }
  //   });

  //   if (gameData.players.length) {
  //     const rightNow = new Date();
  //     const gameStart = new Date(game.last_update_time * 1000);
  //     const lastUpdate = Math.floor(
  //       (rightNow.getTime() - gameStart.getTime()) / 1000 / 60
  //     );

  //     gameData.avgMmr = game.average_mmr;
  //     gameData.lastUpdate = lastUpdate;
  //     gameData.gameTime = Math.ceil(game.game_time / 60);
  //   }

  //   return gameData;
  // });

  console.log(gamesData.filter((game) => game.players.length));

  const avgMmrs = byMmr.map((game) => game.average_mmr);
  return avgMmrs.sort((a, b) => b - a);
};

module.exports = { getLiveGames };
