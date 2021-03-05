module.exports = (client) => {
	// !Temporary variables
	const channelId = '816343519462817856';
	const guildId = '816343519097782343';

	client.on('guildMemberAdd', sendWelcomeMessage(member));
};

async function sendWelcomeMessage(member) {
	const guild = await client.guilds.cache.get(guildId);
	const channel = await guild.channels.cache.get(channelId);

	/**
	 * Embed
	 */
	const welcomeMessage = {
		content: null,
		embed: {
			description: `Bem vindo, <@${member.id}>. veja <#817036733438754866> e <#817036987227832328>`,
			color: 0xf9c81c,
		},
	};

	channel.send(welcomeMessage);
}
