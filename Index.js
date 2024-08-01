const { Telegraf } = require('telegraf');
const axios = require('axios');
require('dotenv').config();

const bot = new Telegraf(process.env.BOT_TOKEN);
const webhookUrl = process.env.WEBHOOK_URL;

// Function to set webhook
const setWebhook = async () => {
    try {
        const response = await axios.post(`https://api.telegram.org/bot${process.env.BOT_TOKEN}/setWebhook`, {
            url: webhookUrl
        });
        console.log('Webhook set:', response.data);
    } catch (error) {
        console.error('Error setting webhook:', error);
    }
};

// Define bot commands and handlers
bot.start((ctx) => ctx.reply('Welcome!'));
bot.help((ctx) => ctx.reply('Send me a message!'));
bot.on('text', (ctx) => {
    ctx.reply(`You said: ${ctx.message.text}`);
});

// Launch bot with webhook configuration
bot.launch({
    webhook: {
        domain: webhookUrl,
        port: process.env.PORT || 443,
    },
}).then(setWebhook);

// Handle graceful shutdown
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
