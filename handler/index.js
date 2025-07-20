const fs = require("fs")

module.exports = async (client) => {

  const matrizz_java_array = []

  fs.readdir(`./commands/`, (error, folder) => {
    folder.forEach(subfolder => {
      fs.readdir(`./commands/${subfolder}/`, (error, files) => {
        files.forEach(files => {

          if (!files?.endsWith('.js')) return;
          files = require(`../commands/${subfolder}/${files}`);
          if (!files?.name) return;
          client.slashCommands.set(files?.name, files);

          matrizz_java_array.push(files)
        });
      });
    });
  });
  client.on("ready", async () => {
    client.guilds.cache.forEach(guild => guild.commands.set(matrizz_java_array))
  });
};