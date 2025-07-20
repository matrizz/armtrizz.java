const { client } = require('../index')

const monitoredUsers = [process.env.UNTOUCHABLE_USER_1, process.env.UNTOUCHABLE_USER_2]

client.on('voiceStateUpdate', async (oldState, newState) => {
    if (!monitoredUsers.includes(newState.id)) return

    if (!oldState.mute && newState.mute) {
        try {
            await newState.setMute(false)
        } catch (err) {
            console.error(`Erro ao remover mute de ${newState.member.user.tag}:`, err)
        }
    } else if (!oldState.deaf && newState.deaf) {
        try {
            await newState.setDeaf(false)
        } catch (err) {
            console.error(`Erro ao remover deaf de ${newState.member.user.tag}:`, err)
        }

    }
})
