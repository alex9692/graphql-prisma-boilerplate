const { Prisma } = require("prisma-binding");
const { fragmentReplacements } = require("./resolvers");

exports.prisma = new Prisma({
	typeDefs: "src/generated/prisma.graphql",
	endpoint: process.env.PRISMA_ENDPOINT,
	secret: process.env.PRISMA_SECRET_KEY,
	fragmentReplacements
});
