import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
const { prisma } = require("../../src/prisma");

const userOne = {
	input: {
		name: "Alex",
		email: "alex@example.com"
	},
	user: undefined,
	jwt: undefined
};

const userTwo = {
	input: {
		name: "Kate",
		email: "kate@example.com"
	},
	user: undefined,
	jwt: undefined
};

exports.seedDb = async () => {
	await prisma.mutation.deleteManyUsers();

	const hashpassword = await bcrypt.hash("test1234", 12);

	userOne.user = await prisma.mutation.createUser({
		data: {
			...userOne.input,
			password: hashpassword
		}
	});

	userTwo.user = await prisma.mutation.createUser({
		data: {
			...userTwo.input,
			password: hashpassword
		}
	});

	userOne.jwt = jwt.sign({ id: userOne.user.id }, process.env.JWT_SECRET_KEY, {
		expiresIn: "3600s"
	});

	userTwo.jwt = jwt.sign({ id: userTwo.user.id }, process.env.JWT_SECRET_KEY, {
		expiresIn: "3600s"
	});
};

exports.userOne = userOne;
exports.userTwo = userTwo;
