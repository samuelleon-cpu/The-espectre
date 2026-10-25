const { Client, GatewayIntentBits, ActivityType } = require('discord.js');
const { joinVoiceChannel } = require('@discordjs/voice');
const http = require('http');

// 1. Servidor HTTP para mantener activo Render
const PORT = process.env.PORT || 3000;
http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.write("¡Bot de Discord activo!");
    res.end();
}).listen(PORT, () => {
    console.log(`Servidor web escuchando en el puerto ${PORT}`);
});

// 2. Configuración del cliente del Bot
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildVoiceStates
    ]
});

// Evento cuando el bot inicia
client.once('ready', () => {
    console.log(`¡Bot conectado exitosamente como ${client.user.tag}!`);

    client.user.setPresence({
        status: 'dnd',
        activities: [{
            name: '!unir para empezar',
            type: ActivityType.Playing
        }]
    });
});

// 3. Comando para unirse al canal de voz (!unir)
client.on('messageCreate', async (message) => {
    if (message.author.bot) return;

    if (message.content.toLowerCase() === '!unir') {
        const voiceChannel = message.member.voice.channel;

        if (!voiceChannel) {
            return message.reply('¡Primero debes conectarte a un canal de voz!');
        }

        try {
            joinVoiceChannel({
                channelId: voiceChannel.id,
                guildId: voiceChannel.guild.id,
                adapterCreator: voiceChannel.guild.voiceAdapterCreator,
            });

            message.reply(`¡Me he unido al canal de voz **${voiceChannel.name}**!`);
        } catch (error) {
            console.error(error);
            message.reply('Hubo un error al intentar unirme al canal de voz.');
        }
    }
});

// Conexión
client.login(process.env.DISCORD_TOKEN);
