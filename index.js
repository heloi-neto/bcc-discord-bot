const Discord = require('discord.js');
const client = new Discord.Client();

const config = require('./config.json');

/**
 * Functions
 */
const welcomeMessages = require('./welcome-messages.js');

// const WOKCommands = require('wokcommands');

client.on('ready', () => {
	console.log('Client initialized successfully.');

	// new WOKCommands(client);

	welcomeMessages(client);
});

client.login(config.token);
