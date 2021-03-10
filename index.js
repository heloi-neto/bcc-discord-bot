const DiscordJS = require('discord.js');
const client = new DiscordJS.Client({
	partials: ['MESSAGE', 'REACTION'],
});

const config = require('./config.json');

/**
 * Command Handler Module
 * Docs @ https://www.npmjs.com/package/wokcommands
 */
const WOKCommands = require('wokcommands');

client.on('ready', () => {
	console.log('Client > initialized successfully.');
	disabledDefaultCommands = [];

	new WOKCommands(client, {
		commandsDir: 'commands',
		featureDir: 'features',
		messagesPath: 'messages.json',
		testServers: ['818916585246162964'],
		disabledDefaultCommands,
		// showWarns: false,
	})
		.setMongoPath(config.mongoPath)
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
});

client.login(config.token);
