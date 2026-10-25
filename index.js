const { Client, GatewayIntentBits, ActivityType } = require('discord.js');
const http = require('http');

// 1. Servidor HTTP para que Render no suspenda el bot
const PORT = process.env.PORT || 3000;
http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.write("¡Bot de Discord activo!");
    res.end();
}).listen(PORT, () => {
    console.log(`Servidor web escuchando en el puerto ${PORT}`);
});

// 2. Inicialización del bot de Discord
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildVoiceStates
    ]
});

// Evento cuando el bot inicia sesión correctamente
client.once('clientReady', () => {
    console.log(`¡Bot conectado exitosamente como ${client.user.tag}!`);

    // Establecer estado a "No Molestar" (dnd)
    client.user.setPresence({
        status: 'dnd',
        activities: [{
            name: '!unir para empezar',
            type: ActivityType.Playing
        }]
    });
});

// Conectar con el Token desde las variables de entorno
client.login(process.env.DISCORD_TOKEN);
