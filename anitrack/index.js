const { default: axios } = require("axios");
const { adb } = require("../lib/utils/adb");
const { EmbedBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder } = require("discord.js");
const { client, env } = require("..");

const animes = adb.get('animes') || []
const savedEps = adb.get('episodes') || {}

async function checkAnimes() {
    for (const animeId of animes) {
        const query = `
        query {
          Media(id: ${animeId}, type: ANIME) {
            title {
              romaji
            }
              coverImage {
                large
                color
            }
            nextAiringEpisode {
              airingAt
              episode
            }
          }
        }`;

        try {
            const res = await axios.post('https://graphql.anilist.co', { query });
            const data = res.data.data.Media;
            const title = data.title.romaji;
            const next = data.nextAiringEpisode;
            const coverImage = data.coverImage;

            if (!next) continue;

            const now = Math.floor(Date.now() / 1000);
            const episode = next.episode;
            const airingAt = next.airingAt;
            const last = savedEps[animeId] || 0;

            const links = adb.get('links')

            const embed = new EmbedBuilder()
                .setTitle(title)
                .setDescription(`**Episódio** ${episode}\n **Proximo episódio**: <t:${airingAt}>\n||<@&${env.ANIME_TRACK_ROLE}>||`)
                .setURL(`https://anilist.co/anime/${animeId}`)
                .setColor(coverImage.color || '#00FFFF')
                .setImage(coverImage.large)
                .setFooter({ text: `powered by GraphQL` });

            const row = new ActionRowBuilder().addComponents(
                new ButtonBuilder()
                    .setLabel('Assistir')
                    .setStyle(ButtonStyle.Link)
                    .setURL(links[animeId] ?? `https://anilist.co/anime/${animeId}`)
            )

            if (airingAt <= now && episode > last) {
                savedEps[animeId] = episode;
                adb.set('episodes', savedEps)

                const canal = await client.channels.fetch(adb.get('channel'));
                canal.send({ embeds: [embed], components: [row], content: `🎬 Novo episódio de **${title}** lançado: Episódio ${episode}!` });
            }

        } catch (err) {
            console.error(`Erro ao buscar anime ${animeId}:`, err.message);
        }
    }
}

async function fetchAnimeInfo(id) {
    const query = `
    query ($id: Int) {
      Media(id: $id, type: ANIME) {
        id
        title {
          romaji
          english
          native
        }
        nextAiringEpisode {
          episode
          airingAt
        }
        coverImage {
          large
        }
      }
    }
  `;

    const variables = { id };

    const response = await axios.post('https://graphql.anilist.co', { query, variables });
    const data = response.data
    return data.data.Media;
}

module.exports = {
    checkAnimes,
    fetchAnimeInfo
}