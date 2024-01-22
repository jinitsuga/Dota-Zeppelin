const axios = require("axios");

const openDotaUrl = "https://api.opendota.com/api";

const getLiveGames = async () => {
  const req = await fetch(`${openDotaUrl}/live`)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
    })
    .catch((error) => {
      console.log(error);
    });
};

module.exports = { getLiveGames };
