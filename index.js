const DiscordJS = require('discord.js');
const WOKCommands = require('wokcommands');

require('custom-env').env();
const { MONGO_PATH, BOT_TOKEN } = process.env;

const client = new DiscordJS.Client({
  partials: ['MESSAGE', 'REACTION'],
});

client.on('ready', () => {
  console.log('Client > initialized successfully.');

  new WOKCommands(client, {
    commandsDir: 'commands',
    featureDir: 'features',
    messagesPath: 'messages.json',
    testServers: ['818916585246162964'],
    disabledDefaultCommands: [],
    // showWarns: false,
  })
    .setMongoPath(MONGO_PATH)
    .setBotOwner(['493159902487904276'])
    .setDefaultPrefix('.')
    .setDefaultLanguage('english')
    .setDisplayName('BCC')
    .setColor(0x9fd7f8)
    .setCategorySettings([
      {
        name: 'Roles',
        emoji: '🎨',
      },
      {
        name: 'Functions',
        emoji: '🔧',
      },
    ]);

  client.user.setPresence({
    activity: {
      name: 'youtube tutorials',
      type: 'WATCHING',
    },
    // afk: true,
    // status: 'dnd',
  });
});

client.login(BOT_TOKEN);
