const { extractFragmentReplacements } = require("prisma-binding");

const { User } = require("./User");
const { Query } = require("./Query");
const { Mutation } = require("./Mutation");
const { Subscription } = require("./Subscription");

const resolvers = {
	User,
	Query,
	Mutation
	// Subscription
};

exports.fragmentReplacements = extractFragmentReplacements(resolvers);
exports.resolvers = resolvers;
