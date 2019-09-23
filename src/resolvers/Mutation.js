const bcrypt = require("bcryptjs");

const { generateHashPassword } = require("../utils/generateHashPassword");
const { generateToken } = require("../utils/generateToken");

module.exports.Mutation = {
	async createUser(parent, args, context, info) {
		const { prisma } = context;

		const hashedPassword =await generateHashPassword(args.data.password);

		const emailExists = await prisma.exists.User({ email: args.data.email });
		if (emailExists) throw new Error("Email is already taken!");

		const user = await prisma.mutation.createUser({
			data: { ...args.data, password: hashedPassword }
		});

		const token = generateToken(user.id);

		return { user, token };
	},
	async login(parent, args, context, info) {
		const { prisma } = context;
		const user = await prisma.query.user({ where: { email: args.data.email } });

		if (!user || !(await bcrypt.compare(args.data.password, user.password)))
			throw new Error("Incorrect email or password");

		const token = generateToken(user.id);

		return { user, token };
	},
	async deleteUser(parent, args, context, info) {
		const { prisma, request } = context;
		const { user } = request;
		const userExist = await prisma.exists.User({ id: user.id });
		if (!userExist) throw new Error("User doesn't exist");

		return prisma.mutation.deleteUser({ where: { id: user.id } }, info);
	},
	async updateUser(parent, args, context, info) {
		const { prisma, request } = context;
		const { user } = request;
		if (args.data.password) {
			args.data.password =await generateHashPassword(args.data.password);
		}

		const userExist = await prisma.exists.User({ id: user.id });
		if (!userExist) throw new Error("User doesn't exists");

		return prisma.mutation.updateUser(
			{
				data: {
					...args.data
				},
				where: { id: user.id }
			},
			info
		);
	}
};
