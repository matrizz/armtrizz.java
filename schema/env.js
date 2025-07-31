const z = require('zod')
require('dotenv').config()

const regex = /\b\d{17,20}\b/

const envSchema = z.object({

    // Env
    ENVIRONMENT: z.enum(['development', 'production']).default('development'),

    // Secret
    TOKEN: z.string(),

    // Gemini API
    GEMINI_API_KEY: z.string(),

    // Config
    OWNER_ID: z.string().regex(regex),
    UNTOUCHABLE_USER_1: z.string().regex(regex, 'User ID inválido'),
    UNTOUCHABLE_USER_2: z.string().regex(regex, 'User ID inválido'),
    MAIN_GUILD_ID: z.optional(z.string().regex(regex, 'Guild ID inválido')),
    MAIN_GUILD_OWNER: z.string().regex(regex, 'User ID inválido'),

    // Roles
    STAFF_ROLE: z.string().regex(regex, 'Role ID inválido'),
    AUTO_ROLE: z.string().regex(regex, 'Role ID inválido'),
    ANIME_TRACK_ROLE: z.string().regex(regex, 'Role ID invildo'),
    REGISTERED_ROLE: z.string().regex(regex, 'Role ID inválido'),
    MORE_THAN_18_ROLE: z.string().regex(regex, 'Role ID inválido'),
    LESS_THAN_18_ROLE: z.string().regex(regex, 'Role ID inválido'),
    MALE_ROLE: z.string().regex(regex, 'Role ID inválido'),
    FEMALE_ROLE: z.string().regex(regex, 'Role ID inválido'),

    // Channels
    BUG_CHANNEL: z.string().regex(regex, 'Channel ID inválido'),
    JOIN_CHANNEL: z.string().regex(regex, 'Channel ID inválido'),
    LEAVE_CHANNEL: z.string().regex(regex, 'Channel ID inválido'),
    LOGS_CHANNEL: z.string().regex(regex, 'Channel ID inválido'),
    REGISTER_LOGS_CHANNEL: z.string().regex(regex, 'Channel ID inválido'),
    MAIN_CHANNEL: z.string().regex(regex, 'Channel ID inválido'),
    MESSAGE_COUNT_CHANNEL: z.string().regex(regex, 'Channel ID inválido'),
    SUGGESTIONS_CHANNEL: z.string().regex(regex, 'Channel ID inválido'),
    REPORT_CHANNEL: z.string().regex(regex, 'Channel ID inválido'),
    INVITE_LOGS_CHANNEL: z.optional(z.string().regex(regex, 'Channel ID inválido')).default(null),
    REVOKED_INVITE_LOGS_CHANNEL: z.optional(z.string().regex(regex, 'Channel ID inválido')).default(null),
})

module.exports = { envSchema }