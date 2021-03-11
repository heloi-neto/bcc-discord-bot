//! Change afterwards
const roleIds = ['819155788130942977'];

module.exports = (client) => {
	client.on('guildMemberAdd', (member) => assingAutoRoles(member));
};

function assingAutoRoles(member) {
	let idx = 0;
	roleIds.forEach((roleId) => {
		setTimeout(() => {
			const role = member.guild.roles.cache.get(roleId);
			if (!role) return;
			member.roles.add(role);
			console.log(`AutoRoles > gave "${member.user.username}" role "${role.name}"`); //* DEV
		}, 1000 * idx++);
	});
}

module.exports.config = {
	displayName: 'AutoRoles',
	dbName: 'AutoRoles',
};
