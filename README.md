# Mango Tree

### Discord bot

Find the top ranked live games to watch and learn from, and tip your friends in-chat whenever fun stuff happens!

#### Commands

- **/live** -- Replies with an embed containing info about the current top ranked live games (via the OpenDota API), such as noticeable players, their heroes, game time and current score.

  <img src="https://github.com/jinitsuga/Mango-Tree/assets/73081185/446f9cbb-c61f-444d-87e4-6cd9e3f05e34" alt="img" width="500"/>

- **/tip {member}** -- Tips another member in the server (completely fictional "coins"), similar to how tipping in-game works, with a random encouragement message from a pool of ~10.
- ![image](https://github.com/jinitsuga/Mango-Tree/assets/73081185/66ae9bcd-2aa6-4baf-b203-5df71507d2f9)
- **/rank** -- Shows rankings, sorted by who has received the most coins (server-scoped).

 <img src="https://github.com/jinitsuga/Mango-Tree/assets/73081185/f96f497d-018b-4df6-b5a5-80f42842b653" alt="img" width="400"/>
 
#### Quick Start
You can add the bot to your server by [following this link](https://discord.com/api/oauth2/authorize?client_id=1195066233020743781&permissions=0&scope=bot+applications.commands) and adding it to whichever server you want it on (you'll need to have admin rights in order to do so).

##### Restricting the bot to one channel

I'd recommend restricting the bot/bot usage to one channel only, but that's entirely up to you and the server's users. [This blog post](https://unita.co/blog/restrict-bot-to-one-channel/) covers it in case you want to do it.

For questions, suggestions or comments, find me on Discord: nitsugai

Feel free to fork the repo and play around with it, it's a simple Node.js setup using a REST endpoint given by [Discord.js](https://discord.js.org/).
