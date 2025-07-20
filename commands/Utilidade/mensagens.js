const Discord = require("discord.js")
const db = require("../../lib/utils/db")

module.exports = {
  name: 'mensagens',
  description: 'Contador de mensagens.',
  type: Discord.ApplicationCommandType.ChatInput,
  options: [
    {
      name: 'usuário',
      description: 'Veja a quantidade de mensagens deste usuário.',
      type: Discord.ApplicationCommandOptionType.User,
      required: false,
    }
  ],

  run: async (client, interaction) => {

    let user = interaction.options.getUser('usuário')
    if (!user) user = interaction.user

    let member = interaction.guild.members.cache.get(user.id)

    if (!member) {
      const embed = new Discord.EmbedBuilder()
        .setColor('Red')
        .setDescription(`O usuário mencionado não está no servidor!`)

      interaction.reply({ embeds: [embed] })
    } else {
      let messageCounter = db.get(`userMsgCount_${process.env.MAIN_CHANNEL}_${member.user.id}`)
      if (!messageCounter) messageCounter = 0

      const embed = new Discord.EmbedBuilder()
        .setColor('Yellow')
        .setAuthor({ name: member.user.username, iconURL: member.user.displayAvatarURL({ dynamic: true }) })
        .setDescription(`O usuário ${member} ||(${member.user.id})|| possui \`${messageCounter}\` mensagens neste servidor.`)

      interaction.reply({ embeds: [embed] })
    }
  }
}