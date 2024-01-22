const fs = require("node:fs");

const { readGuildFile } = require("../utility/tipHandler");

const createGuild = (path, name) => {
  try {
    fs.writeFileSync(`${path}/${name}.json`, JSON.stringify([]));
    console.log(`Created guild ${name} file.`);
  } catch (err) {
    console.error(err);
  }
};

const deleteGuild = (path, name) => {
  try {
    fs.unlinkSync(`${path}/${name}.json`);
  } catch (err) {
    console.error(err);
  }
};

// Get guild members, sort them by number of tipped coins, return ordered list of members as strings.
const getGuildRanks = async (guild) => {
  const guildData = await readGuildFile(guild);

  if (guildData == []) {
    return [];
  }

  const sortedData = guildData.sort((a, b) => b.coins.tipped - a.coins.tipped);
  const rankedMembers = sortedData.map((memb, id) => {
    const rank = id + 1;
    let medal = "";

    if (rank == 1) {
      medal = ":first_place:";
    } else if (rank == 2) {
      medal = ":second_place:";
    } else if (rank == 3) {
      medal = ":third_place:";
    }
    return `${rank}. ${memb.name}: holds ${memb.coins.tipped} ${
      memb.coins.tipped !== 1 ? "coins" : "coin"
    }. ${medal}`;
  });

  console.log("RANKED MEMBERS =>", rankedMembers);
  return rankedMembers;
};
module.exports = { createGuild, deleteGuild, getGuildRanks };
