require('../index')
const client = require('../index')

client.on('ready', async () => {
    console.log(`🔥 Estou online em ${client.user.username}!`)
})