const fs = require("node:fs");
const path = require("node:path");

const guildsPath = path.join(__dirname, "../guilds");

//

const createUser = (username, guild, users) => {
  const filePath = path.join(guildsPath, `${guild}.json`);
  const allUsers = users;

  const newUser = {
    username: username,
    coins: {
      usable: 3,
      tipped: 0,
    },
  };
  allUsers.push(newUser);

  fs.writeFile(filePath, JSON.stringify(allUsers), (err) => {
    if (err) throw err;
    console.log("user created in guild file.");
  });
};

const tipUser = async (username, guild) => {
  const filePath = path.join(guildsPath, `${guild}.json`);
  fs.readFile(filePath, async (err, data) => {
    if (err) {
      console.error(err);
    }

    const parsedData = JSON.parse(data);

    console.log("PARSED DATA =>", parsedData);

    const existingMember = parsedData.find((user) => user.username == username);
    if (existingMember) {
      console.log("user already exists");
      const id = parsedData.indexOf(existingMember);
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

module.exports = { tipUser, createUser };
