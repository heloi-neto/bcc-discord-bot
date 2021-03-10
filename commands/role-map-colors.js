module.exports = {
	category: 'Roles',
	name: 'RoleMapColors',
	description: "Change all roles' color from one color to another",
	aliases: ['rolemapcolors', 'rolemc'],
	minArgs: 2,
	maxArgs: 2,
	guildOnly: true,
	callback: ({ message, args }) => {
		/**
		 * Parse the colors arrays
		 */

		const oldColors = args[0].toLowerCase().split(',');
		const newColors = args[1].toLowerCase().split(',');

		/**
		 * Check & Change Colors
		 */

		//! Make sure you're not abusing the api
		let idx = 0;
		message.guild.roles.cache.forEach((role) => {
			setTimeout(() => {
				if (!role.permissions.toArray().includes('ADMINISTRATOR')) {
					const colorIdx = oldColors.indexOf(role.color.toString(16));
					if (colorIdx != -1) {
						console.log(
							role.name,
							parseInt(newColors[colorIdx], 16)
						);
						role.edit({
							color: parseInt(newColors[colorIdx], 16),
						});
					}
				}
			}, 1000 * idx++);
		});
	},
};
