const { authMiddleware } = require("./checkAuthorization");

const auth = {
	Query: {
		me: authMiddleware,
		users: authMiddleware
	},
	Mutation: {
		updateUser: authMiddleware,
		deleteUser: authMiddleware
	},
	User: {
		email: authMiddleware
	},
	Subscription: {}
};

module.exports = auth;
