//! rushed. delete or remake

module.exports = {
	category: 'Roles',
	name: 'SimulateJoin',
	description: "Change all roles' color with one certain color to another",
	aliases: ['simjoin'],
	minArgs: 1,
	maxArgs: 1,
	testOnly: true,
	guildOnly: true,
	callback: ({ args, message }) => {
		console.log(args[0]);
		message.guild.members.fetch(args[0]).then((member) => {
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

			const channel = member.guild.channels.cache.get(
				'817036945808949298'
			);
			if (!channel) return;

			channel.send(WelcomeMessage);
		});
	},
};
