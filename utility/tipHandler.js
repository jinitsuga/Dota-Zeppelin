const fs = require("node:fs");
const { readFile } = require("node:fs/promises");
const path = require("node:path");

const guildsPath = path.join(__dirname, "../guilds");

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
  const filePath = path.join(guildsPath, `${guild}.json`);
  fs.readFile(filePath, async (err, data) => {
    console.log("IS THIS THING ON??");
    if (err) {
      console.error(err);
    }

    const parsedData = await JSON.parse(data);

    console.log("PARSED DATA =>", parsedData);

    const memberExists = await parsedData.find(
      (user) => user.username == username
    );
    if (memberExists) {
      console.log("user already exists");
      const id = parsedData.indexOf(memberExists);
      parsedData[id].coins.tipped++;
    } else {
      return createUser(username, guild, parsedData);
    }

    fs.writeFile(filePath, JSON.stringify(parsedData), (err) => {
      if (err) throw err;
      console.log("username written in file.");
    });
  });
};

// Removes one coin from the user tipping from the daily limit of 3.
const removeUsable = async (username, guild) => {
  const filePath = path.join(guildsPath, `${guild}.json`);
  fs.readFile(filePath, async (err, data) => {
    if (err) {
      console.error(err);
    }

    const parsedData = JSON.parse(data);

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

    fs.writeFile(filePath, JSON.stringify(parsedData), (err) => {
      if (err) throw err;
      console.log("username written in file.");
    });
  });
};

const checkAvailableCoins = async (username, guild) => {
  const filePath = path.join(guildsPath, `${guild}.json`);

  let result = "";
  await readFile(filePath, async (err, data) => {
    if (err) {
      console.error(err);
    }
    const parsedData = await JSON.parse(data);

    const member = await parsedData.find((user) => user.username == username);

    console.log("COIN MEMBERRRRRR =>", member);

    if (!member) {
      result = true;
    } else if (member.coins.usable > 0) {
      result = true;
    } else {
      result = false;
    }
  });

  return result;
};

module.exports = { tipUser, createUser, removeUsable, checkAvailableCoins };
