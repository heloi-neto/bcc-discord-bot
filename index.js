const Discord = require('discord.js');
const client = new Discord.Client();

const config = require('./config.json');

/**
 * Command Handler Module
 * Docs @ https://www.npmjs.com/package/wokcommands
 */
const WOKCommands = require('wokcommands');

client.on('ready', () => {
	console.log('Client initialized successfully.');
	disabledDefaultCommands = [];

	new WOKCommands(client, {
		commandsDir: 'commands',
		featuresDir: 'features',
		messagesPath: 'messages.json',
		testServers: ['816343519097782343'],
		disabledDefaultCommands,
		// showWarns: false,
	})
		.setBotOwner(['493159902487904276'])
		.setDefaultPrefix('.')
		.setDefaultLanguage('english');
});

client.login(config.token);
