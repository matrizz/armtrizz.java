const Discord = require("discord.js")
require('dotenv').config()
const db = require('./lib/utils/db.js')


console.log()
const client = new Discord.Client({
  intents: [1, 512, 32768, 2, 128,
    Discord.IntentsBitField.Flags.DirectMessages,
    Discord.IntentsBitField.Flags.GuildInvites,
    Discord.IntentsBitField.Flags.GuildMembers,
    Discord.IntentsBitField.Flags.GuildPresences,
    Discord.IntentsBitField.Flags.Guilds,
    Discord.IntentsBitField.Flags.MessageContent,
    Discord.IntentsBitField.Flags.Guilds,
    Discord.IntentsBitField.Flags.GuildMessageReactions,
    Discord.IntentsBitField.Flags.GuildEmojisAndStickers
  ],
  partials: [
    Discord.Partials.User,
    Discord.Partials.Message,
    Discord.Partials.Reaction,
    Discord.Partials.Channel,
    Discord.Partials.GuildMember
  ]
});

module.exports = client


client.on('interactionCreate', async (interaction) => {


  if (interaction.type === Discord.InteractionType.ApplicationCommand) {

    const cmd = client.slashCommands.get(interaction.commandName);

    if (!cmd) return interaction.reply(`Error`);

    interaction["member"] = interaction.guild.members.cache.get(interaction.user.id);

    cmd.run(client, interaction)

  }
  if (!interaction.isButton()) return;

  if (!interaction.member.permissions.has(Discord.PermissionFlagsBits.BanMembers)) {
    return interaction.reply({ ephemeral: true, content: 'Você não tem permissão para usar este botão.' });
  }

  if (interaction.customId.startsWith('ban_temp_')) {
    const userId = interaction.customId.split('_')[2];
    const member = await interaction.guild.members.fetch(userId).catch(() => null);
    if (!member) return interaction.reply({ ephemeral: true, content: 'Usuário não encontrado.' });

    await member.ban({ reason: 'Ban temporário via report' });
    setTimeout(async () => {
      await interaction.guild.members.unban(userId, 'Ban temporário expirado');
    }, 24 * 60 * 60 * 1000);

    interaction.reply({ ephemeral: true, content: `Usuário banido temporariamente por 1 dia.` });
  }

  if (interaction.customId.startsWith('ban_perm_')) {
    const userId = interaction.customId.split('_')[2];
    const member = await interaction.guild.members.fetch(userId).catch(() => null);
    if (!member) return interaction.reply({ ephemeral: true, content: 'Usuário não encontrado.' });

    await member.ban({ reason: 'Ban permanente via report' });
    interaction.reply({ ephemeral: true, content: `Usuário banido permanentemente.` });
  }

})

client.slashCommands = new Discord.Collection()

require('./handler')(client)

client.login(process.env.TOKEN)

client.on('error', console.error)
process.on('unhandledRejection', console.error)

const fs = require('fs');

fs.readdir('./events', (err, file) => {
  file.forEach(event => {
    require(`./events/${event}`)
  })
})