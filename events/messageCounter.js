require('../index')

const Discord = require('discord.js')
const client = require('../index')
const db = require('../lib/utils/db');

client.on('messageCreate', async (message) => {
    if (message.author.bot) return;
    if (message.channel.id !== process.env.MAIN_CHANNEL) return;

    let msgCount = await db.get(`msgCount_${message.channel.id}`)
    if (!msgCount) msgCount = 0
    msgCount += 1
    await db.set(`msgCount_${message.channel.id}`, msgCount)

    let userCount = await db.get(`userMsgCount_${message.channel.id}_${message.author.id}`)
    if (!userCount) userCount = 0
    userCount += 1
    await db.set(`userMsgCount_${message.channel.id}_${message.author.id}`, userCount)
})