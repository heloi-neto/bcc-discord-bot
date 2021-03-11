//! Change afterwards
//prettier-ignore
const channelIds = [
	'817039081933766686',
	'817039252243611659',
	'817039252826226688',
	'819582331584643082',
	'819582384499720253'
];

module.exports = (client) => {
	client.on('voiceStateUpdate', (oldState, newState) => checkUpdate(oldState, newState));
};

function checkUpdate(oldState, newState) {
	//prettier-ignore
	if (
    !channelIds.includes(newState.channelID) &&
    !channelIds.includes(oldState.channelID)
  ) return;

	if (newState.channelID && !oldState.channelID) {
		const channel = newState.guild.channels.cache.get(newState.channelID);
		if (channel.members.array().length > 1) return;

		// console.log(`CascadingVoiceChannels > voice channel "${channel.name.slice(3)}" opened`); //* DEV
		cascadeOpen(channel);
	} else if (!newState.channelID && oldState.channelID) {
		const channel = oldState.guild.channels.cache.get(oldState.channelID);
		if (channel.members.array().length > 0) return;

		// console.log(`CascadingVoiceChannels > voice channel "${channel.name.slice(3)}" closed`); //* DEV
		cascadeClose(channel);
	}
}

function cascadeOpen(channel) {
	const _nextClosedChanel = nextClosedChanel(channel);
	if (!_nextClosedChanel) return;
	showChannel(_nextClosedChanel);
}

function cascadeClose(channel) {
	/**
	 * Looks For the next visible channel without members and takes its place
	 */
	if (channel.id === channelIds[0] || prevChannelIsUsed(channel)) {
		const _nextUnusedChannel = nextUnusedChannel(channel);
		if (_nextUnusedChannel) {
			hideChannel(_nextUnusedChannel);
			return;
		}
	}
	hideChannel(channel);
}

function showChannel(channel) {
	channel.overwritePermissions([
		{
			id: channel.guild.roles.everyone.id,
			allow: ['VIEW_CHANNEL', 'CONNECT'],
			deny: [],
		},
	]);
}

function hideChannel(channel) {
	channel.overwritePermissions([
		{
			id: channel.guild.roles.everyone.id,
			allow: [],
			deny: ['VIEW_CHANNEL', 'CONNECT'],
		},
	]);
}

function nextClosedChanel(channel) {
	const nextChannelIdx = channelIds.indexOf(channel.id) + 1;
	if (nextChannelIdx > channelIds.length - 1) return null;

	const nextChannel = channel.guild.channels.cache.get(channelIds[nextChannelIdx]);

	if (isClosedChannel(nextChannel)) return nextChannel;
	else return nextClosedChanel(nextChannel);
}

function isClosedChannel(channel) {
	return channel.permissionOverwrites.get(channel.guild.roles.everyone.id).deny.toArray().includes('VIEW_CHANNEL');
}

function prevChannelIsUsed(channel) {
	const prevChannelId = channelIds[channelIds.indexOf(channel.id) - 1];
	const prevChannel = channel.guild.channels.cache.get(prevChannelId);
	return !isUnusedChannel(prevChannel);
}

function nextUnusedChannel(channel) {
	const nextChannelIdx = channelIds.indexOf(channel.id) + 1;
	if (nextChannelIdx > channelIds.length - 1) return null;

	const nextChannel = channel.guild.channels.cache.get(channelIds[nextChannelIdx]);

	if (isUnusedChannel(nextChannel)) return nextChannel;
	else return nextUnusedChannel(nextChannel);
}

function isUnusedChannel(channel) {
	return channel.permissionOverwrites.get(channel.guild.roles.everyone.id).allow.toArray().includes('VIEW_CHANNEL') && channel.members.array().length <= 0;
}

module.exports.config = {
	displayName: 'CascadingVoiceChannels',
	dbName: 'CascadingVoiceChannels',
};
