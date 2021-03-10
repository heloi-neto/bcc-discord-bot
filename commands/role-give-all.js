module.exports = {
	category: 'Roles',
	name: 'RoleGiveAll',
	description: 'Give all players a certain role',
	aliases: ['rolegiveall', 'rolega'],
	minArgs: 1,
	maxArgs: 1,
	ownerOnly: true,
	guildOnly: true,
	callback: ({ message, args }) => {
		const roleId = args[0];
		const role = message.guild.roles.cache.get(roleId);
		if (!role) return;

		let idx = 0;
		message.guild.members.cache.forEach((member) => {
			setTimeout(() => {
				if (!member.user.bot && !member.roles.cache.get(roleId)) {
					member.roles.add(role);
					//prettier-ignore
					console.log(`RoleGiveAll > gave "${member.user.username}" role "${role.name}"`); //* DEV
				}
			}, 1000 * idx++);
		});
		//prettier-ignore
		console.log(`RoleGiveAll > finished. gave "${role.name}" to ${idx} members`); //* DEV
	},
};
