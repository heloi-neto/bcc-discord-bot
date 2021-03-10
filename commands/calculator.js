/**
 * Mathematical Library
 * Docs @ https://mathjs.org/docs/expressions/syntax.html
 */

const mathjs = require('mathjs');

module.exports = {
	category: 'Educational',
	name: 'Calculator',
	description: 'An extremely efficient, flexible and amazing calculator for Math expressions',
	aliases: ['c', 'calc', 'calculate'],
	permissionError: '',
	minArgs: 1,
	testOnly: false,
	callback: ({ message, text }) => {
		/**
		 * Try to parse text
		 */
		let response = { ans: '', exp: '', status: '' };
		try {
			response.exp = mathjs.parse(text);
			response.ans = response.exp.evaluate();
			response.status = 'sucess';
		} catch (e) {
			if (e instanceof SyntaxError) {
				/**
				 * Unable to parse text - Probably JS Injection
				 */
				console.log('Calculator > SyntaxError'); //* DEV
				response.status = 'warning';
			} else {
				/**
				 * Unable to evaluate expression
				 */
				console.log('Calculator > ReferenceError'); //* DEV
				response.status = 'error';
			}
			response.errMsg = e.message;
		}

		/**
		 * Embed
		 */
		const embedConfig = {
			sucess: {
				color: 0x41d069,
				img: 'https://i.imgur.com/Gu4CpOH.png' /* 'https://i.imgur.com/OTKIaWv.png', */,
				tag: 'fix\n',
				msg: `${response.exp} = ${response.ans}`,
			},
			error: {
				color: 0xf9371c,
				img: 'https://i.imgur.com/33aKqqI.png',
				tag: 'diff\n- ',
				msg: `Error @ "${response.exp}": ${response.errMsg}`,
			},
			warning: {
				color: 0xf97c1c,
				img: 'https://i.imgur.com/tDdZNbD.png',
				tag: 'css\n',
				msg: `[Error - js injection much?]` /*  : ${response.errMsg}` */,
			},
		};

		const res = embedConfig[response.status];
		// FORMAT 0
		const embed = {
			content: null,
			embed: {
				description: '```' + `${res.tag}${res.msg}` + '```',
				color: res.color,
				author: {
					name: 'Calculator',
					icon_url: res.img,
				},
			},
		};

		// // FORMAT 1
		// const embed = {
		// 	content: null,
		// 	embed: {
		// 		color: embedConfig[response.status].color,
		// 		author: {
		// 			name: `${response.exp} = ${response.ans}`,
		// 			icon_url: embedConfig[response.status].img,
		// 		},
		// 	},
		// };

		/**
		 * Send Embed
		 */
		message.channel.send(embed);
	},
};
