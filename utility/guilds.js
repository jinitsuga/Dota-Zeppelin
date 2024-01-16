const fs = require("node:fs");

const createGuild = (path, name) => {
  try {
    fs.writeFileSync(`${path}/${name}.json`, "");
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

module.exports = { createGuild, deleteGuild };
