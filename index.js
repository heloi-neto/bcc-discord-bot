const Discord = require('discord.js');
const client = new Discord.Client();
const config = require('./config.json');

client.on('ready', () => {
	console.log('Client initialized successfully.');
});

client.login(config.token);
