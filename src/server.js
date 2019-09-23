const { GraphQLServer, PubSub } = require("graphql-yoga");

const { resolvers, fragmentReplacements } = require("./resolvers");
const { prisma } = require("./prisma");
const auth = require("./utils/setupMiddleware");

const pubsub = new PubSub();

const server = new GraphQLServer({
	typeDefs: "./src/schema.graphql",
	resolvers,
	context(req) {
		const request = req.request ? req.request : req.connection;
		return {
			pubsub,
			prisma,
			request
		};
	},
	middlewares: [auth],
	fragmentReplacements
});

module.exports = server;
