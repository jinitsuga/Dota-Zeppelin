const fs = require("node:fs");

const readGuildFile = require("../utility/tipHandler");

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

const getGuildRanks = async (guild) => {
  const guildData = readGuildFile(guild);
  if (guildData == []) {
    return guildData;
  }

  const sortedData = guildData.map((member) => {
    return `${member.name}`;
  });
};

module.exports = { createGuild, deleteGuild };
