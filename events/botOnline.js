require('../index')
const { checkAnimes } = require('../anitrack')
const { client } = require('../index')

client.once('ready', async () => {
    console.log(`🔥 Estou online em ${client.user.username}!`)
    setInterval(checkAnimes, 60 * 1000)
})