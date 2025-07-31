const Discord = require("discord.js");
const { MessageFlags, EmbedBuilder } = require("discord.js");
const { adb } = require("../../lib/utils/adb");
const { fetchAnimeInfo } = require("../../anitrack");

module.exports = {
    name: "tracklist",
    description: "Lista os animes sendo trackeados.",
    type: Discord.ApplicationCommandType.ChatInput,

    run: async (client, interaction) => {
        const animes = adb.get('animes') || []
        const embedList = []

        await interaction.deferReply()
        if (animes.length === 0) {
            interaction.editReply({ content: '📭 Nenhum anime está sendo trackeado no momento.', flags: MessageFlags.Ephemeral });
            setTimeout(() => {
                interaction.deleteReply().catch(console.error);
            }, 2500)
            return
        }

        for (const animeId of animes) {

            try {
                const anime = await fetchAnimeInfo(animeId)
                console.log(anime)
                const title = anime.title.romaji || anime.title.english || anime.title.native;
                const episode = anime.nextAiringEpisode?.episode ?? 'Finalizado';
                const date = anime.nextAiringEpisode?.airingAt
                    ? `<t:${anime.nextAiringEpisode.airingAt}:f>`
                    : '—';

                embedList.push({
                    name: `📺 ${title}`,
                    value: `**Próx. Ep:** ${episode}\n**Data:** ${date}`,
                    inline: false,
                });
            } catch (error) {
                console.error(error);
            }

            if (embedList.length === 0) {
                interaction.editReply({ content: 'Não foi possível buscar os dados dos animes.', flags: MessageFlags.Ephemeral });
                setTimeout(() => {
                    interaction.deleteReply().catch(console.error);
                }, 2500);
                return
            }

            await interaction.editReply({
                embeds: [{
                    title: '📌 Animes Trackeados',
                    color: 0x00bfff,
                    fields: embedList,
                    timestamp: new Date().toISOString(),
                }]
            });
        }
    }
}
