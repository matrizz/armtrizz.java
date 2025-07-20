const { GoogleGenAI } = require('@google/genai')
const { env } = require('../index');

const genAI = new GoogleGenAI({ apiKey: env.GEMINI_API_KEY })

const MODELS = [
    "gemini-2.5-flash",              // até 250 req/dia
    "gemini-2.5-pro"                 // até 100 req/dia
]

async function askGemini(pergunta) {
    for (const model of MODELS) {
        try {
            const res = await genAI.models.generateContent({
                model: model,
                contents: `Responda em português utilizando Markdown e seja brevem, no maximo 2000 caracteres: ${pergunta}`
            });
            if (res && res.text) return res.text;
        } catch (err) {
            console.warn(`\x1b[01;33mModelo\x1b[0m "${model}"\n\x1b[01;31mfalhou:`, err.message);
        }
    }
    return;
}

module.exports = { askGemini };
