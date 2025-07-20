require('../index')

const Discord = require('discord.js')
const client = require('../index')

client.on("guildMemberAdd", (member) => {
  let canal_logs = process.env.JOIN_CHANNEL;
  if (!canal_logs) return;

  let embed = new Discord.EmbedBuilder()
    .setColor("Green")
    .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
    .setTitle("👋 Boas Vindas!")
    .setDescription(`> ${member} colou no server!\nSeja Bem-Vindo(a) ao servidor \`${member.guild.name}\`!\nAtualmente estamos com \`${member.guild.memberCount}\` membros.`);

  member.guild.channels.cache.get(canal_logs).send({ embeds: [embed], content: `` })
})

client.on("guildMemberRemove", (member) => {
  let canal_logs = process.env.LEAVE_CHANNEL;
  if (!canal_logs) return;

  let embed = new Discord.EmbedBuilder()
    .setColor("Red")
    .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
    .setTitle(`Adeus ${member.user.username}....`)
    .setDescription(`> O ${member} se fudeo. Voltamos para ${member.guild.memberCount} membros.`);

  member.guild.channels.cache.get(canal_logs).send({ embeds: [embed], content: `` })
})

