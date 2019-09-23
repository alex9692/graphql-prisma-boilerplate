module.exports.Query = {
	users(parent, args, context, info) {
		const { prisma } = context;
		const opArgs = {
			first: args.first,
			skip: args.skip,
			after: args.after,
			orderBy: args.orderBy
		};

		if (args.query) {
			opArgs.where = {
				OR: [
					{
						name_contains: args.query
					}
				]
			};
		}

		return prisma.query.users(opArgs, info);
	},
	async me(parent, args, context, info) {
		const { prisma, request } = context;
		const { user } = request;
		if (!user) throw new Error("Please login");

		const userExist = await prisma.exists.User({ id: user.id });
		if (!userExist) throw new Error("User doesn't exist");

		return prisma.query.user({ where: { id: user.id } }, info);
	}
};
