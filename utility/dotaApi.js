const axios = require("axios");
const { heroes } = require("./heroes");

const openDotaUrl = "https://api.opendota.com/api";

const findHero = (id) => {
  const hero = heroes.find((hero) => hero.id === id);
  return hero.localized_name;
};

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

  let gamesData = [];

  for (let i = 0; i < byMmr.length; i++) {
    const game = byMmr[i];
    const rightNow = new Date();
    const gameStart = new Date(game.last_update_time * 1000);
    const lastUpdate = Math.floor(
      (rightNow.getTime() - gameStart.getTime()) / 1000 / 60
    );

    if (lastUpdate > 25) continue;

    const gameData = { players: [] };

    game.players.map((player) => {
      if (player.name) {
        gameData.players.push({
          name: player.name,
          hero: player.hero_id ? findHero(player.hero_id) : "Picking hero...",
        });
      }
    });

    if (gameData.players.length) {
      gameData.avgMmr = game.average_mmr;
      gameData.lastUpdate = lastUpdate;
      gameData.gameTime = Math.ceil(game.game_time / 60) + lastUpdate;
      gameData.score = `${game.radiant_score} - ${game.dire_score}`;
    }
    gamesData.push(gameData);
  }

  return gamesData;
};

module.exports = { getLiveGames };
