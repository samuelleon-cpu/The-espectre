const { Client, GatewayIntentBits } = require('discord.js');
const { joinVoiceChannel } = require('@discordjs/voice');

// Configuración de los intents requeridos
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildVoiceStates,
  ]
});

// Mensaje al iniciar sesión
client.once('ready', () => {
  console.log(`¡Bot conectado exitosamente como ${client.user.tag}!`);
});

// Evento al recibir un mensaje
client.on('messageCreate', async (message) => {
  // Ignorar mensajes enviados por otros bots
  if (message.author.bot) return;

  // Comando para unirse al canal de voz
  if (message.content === '!unir') {
    const voiceChannel = message.member.voice.channel;

    // Verificar si el usuario está en un canal de voz
    if (!voiceChannel) {
      return message.reply('¡Tienes que estar dentro de un canal de voz para usar este comando!');
    }

    try {
      // Unirse al canal de voz del usuario
      joinVoiceChannel({
        channelId: voiceChannel.id,
        guildId: voiceChannel.guild.id,
        adapterCreator: voiceChannel.guild.voiceAdapterCreator,
      });

      message.reply('¡Me he unido a tu canal de voz!');
    } catch (error) {
      console.error(error);
      message.reply('Ocurrió un error al intentar unirme al canal de voz.');
    }
  }
});

// Iniciar sesión con el Token guardado en Render
client.login(process.env.DISCORD_TOKEN);
