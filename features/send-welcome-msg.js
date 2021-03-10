//! change afterwards
const welcomeChannelId = '817036945808949298';

module.exports = (client) => {
	client.on('guildMemberAdd', (member) => sendWelcomeMessage(member));
};

function sendWelcomeMessage(member) {
	/**
	 * Embed
	 */
	const WelcomeMessage = {
		content: null,
		embed: {
			title: `${member.user.tag} | Bem-vindo(a)!`,
			description: `Salve  <@${member.id}> 👋. Seja muito bem-vindo ao servidor de BCC da UTFPR-PG. Sinta-se em casa!\n\n👉 Ah, e não se esqueça de passar no <#817036733438754866> e \n<#816123807147360306> para obter acesso aos canais das suas matérias.`,
			color: 0xf9c81c,
			thumbnail: {
				url: 'https://i.imgur.com/wfRmbti.png',
			},
		},
	};

	const channel = member.guild.channels.cache.get(welcomeChannelId);
	if (!channel) return;

	channel.send(WelcomeMessage);
}

module.exports.config = {
	displayName: 'SendWelcomeMessage',
	dbName: 'SendWelcomeMessage',
};
