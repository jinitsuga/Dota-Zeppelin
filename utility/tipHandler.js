const fs = require("node:fs");
const filesystem = require("fs").promises;
const path = require("node:path");

const guildsPath = path.join(__dirname, "../guilds");

const readGuildFile = async (guild) => {
  const filePath = path.join(guildsPath, `${guild}.json`);
  const guildReadings = await filesystem.readFile(filePath, "utf8", (err) => {
    if (err) {
      throw err;
    }
  });
  return await JSON.parse(guildReadings);
};

const writeGuildFile = async (guild, data) => {
  const filePath = path.join(guildsPath, `${guild}.json`);

  await filesystem.writeFile(filePath, JSON.stringify(data), (err) => {
    if (err) throw err;
    console.log("username written in file.");
  });
};

// Creates user in the server file.
// If it's a recipient, 3 usable coins are given, if it's a tipper they're given 2 since
// they just used one.
const createUser = (username, guild, users, tipper) => {
  const filePath = path.join(guildsPath, `${guild}.json`);
  const allUsers = users;

  const newUser = {
    username: username,
    coins: {
      usable: tipper ? 2 : 3,
      tipped: 0,
    },
  };
  allUsers.push(newUser);

  fs.writeFile(filePath, JSON.stringify(allUsers), (err) => {
    if (err) throw err;
    console.log("user created in guild file.");
  });
};

// Tips the user, increases recipient "tipped count" by 1 every time.
const tipUser = async (username, guild) => {
  const parsedData = await readGuildFile(guild);

  const memberExists = await parsedData.find(
    (user) => user.username == username
  );

  if (memberExists) {
    console.log("user already exists");
    const id = parsedData.indexOf(memberExists);
    parsedData[id].coins.tipped++;
    console.log("modified data", parsedData);
  } else {
    return createUser(username, guild, parsedData);
  }

  writeGuildFile(guild, parsedData);
};

// Removes one coin from the user tipping from the daily limit of 3.
const removeUsable = async (username, guild) => {
  const parsedData = await readGuildFile(guild);

  const member = parsedData.find((user) => user.username == username);
  if (member && member.coins.usable > 0) {
    console.log("user already exists");
    const id = parsedData.indexOf(member);
    parsedData[id].coins.usable--;
  } else if (member && member.coins.usable <= 0) {
    return false;
  } else {
    return createUser(username, guild, parsedData, true);
  }

  writeGuildFile(guild, parsedData);
};

const checkAvailableCoins = async (username, guild) => {
  const filePath = path.join(guildsPath, `${guild}.json`);
  console.log("checking for coins...");

  const fileReadings = await filesystem.readFile(
    filePath,
    "utf8",
    async (err, data) => {
      console.log("reading file...");
      if (err) {
        console.error(err);
      }
    }
  );
  const parsedData = await JSON.parse(fileReadings);

  const member = await parsedData.find((user) => user.username == username);
  console.log("MEMBER COINS", member.coins);

  if (!member) {
    return true;
  } else if (member.coins.usable > 0) {
    return true;
  } else {
    return false;
  }
};

module.exports = { tipUser, createUser, removeUsable, checkAvailableCoins };
