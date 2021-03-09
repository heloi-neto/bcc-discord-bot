const channelId = /* '816343519462817856'  */ '812874557617995796';
const guildId = /* '816343519097782343' */ '812874557617995799';

module.exports = (client, instance) => {
	console.log('isOn');
	//! Temporary variables

	client.on('guildMemberAdd', sendWelcomeMessage(member));
};

async function sendWelcomeMessage(member) {
	const guild = await client.guilds.cache.get(guildId);
	const channel = await guild.channels.cache.get(channelId);

	console.log(member);

	/**
	 * Embed
	 */
	const WelcomeMessage = {
		content: null,
		embed: {
			title: '| Bem-vindo(a)!',
			description: `Salve  <@${member.id}> 👋. Seja muito bem-vindo ao servidor de BCC da UTFPR-PG. Sinta-se em casa!\n\n👉 Ah, e não se esqueça de passar no <#817036733438754866> e <#817036987227832328> para obter acesso aos canais das suas matérias. 😉`,
			color: 0xf9c81c,
			thumbnail: {
				url: 'https://i.imgur.com/wfRmbti.png',
			},
		},
	};

	channel.send(WelcomeMessage(member));
}

// module.exports.config = {
// 	displayName: 'OnGuildName',
// 	test,
// };
