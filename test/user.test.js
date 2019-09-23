import "cross-fetch/polyfill";

const { prisma } = require("../src/prisma");
const { seedDb, userOne, userTwo } = require("./utils/seedDB");
const { getClient } = require("./utils/getClient");
const { userOperations } = require("./utils/operation");

const client = getClient();

beforeEach(seedDb, 60000);

test("should create a new user", async () => {
	const variables = {
		data: { name: "Gwen", email: "gwen@example.com", password: "test1234" }
	};

	const response = await client.mutate({
		mutation: userOperations.newUser,
		variables
	});

	const userExist = await prisma.exists.User({
		id: response.data.createUser.user.id
	});

	expect(userExist).toBe(true);
}, 60000);

test("should expose public author profiles", async () => {
	const response = await client.query({
		query: userOperations.getUsers
	});

	const totalUsers = response.data.users.length;
	expect(totalUsers).toBe(2);
}, 60000);

test("should not login with bad credentials", async () => {
	const variables = {
		data: { email: "alex@example.com", password: "1234" }
	};

	await expect(
		client.mutate({ mutation: userOperations.login, variables })
	).rejects.toThrow();
}, 60000);

test("should not register with small password", async () => {
	const variables = {
		data: { name: "stacy", email: "stacy@example.com", password: "1234" }
	};

	await expect(
		client.mutate({ mutation: userOperations.newUser, variables })
	).rejects.toThrow();
}, 60000);

test("should expose private logged in user data", async () => {
	const client = getClient(userOne.jwt);

	const response = await client.query({ query: userOperations.getMe });

	expect(response.data.me.email).toBe(userOne.user.email);
}, 60000);

test("should not signup a user with email that is already in use", async () => {
	const variables = {
		data: {
			name: "Alex",
			email: "alex@example.com",
			password: "test1234"
		}
	};

	await expect(
		client.mutate({ mutation: userOperations.newUser, variables })
	).rejects.toThrow();
}, 60000);

test("should login and provide authentication token", async () => {
	const variables = {
		data: { email: "alex@example.com", password: "test1234" }
	};

	const response = await client.mutate({
		mutation: userOperations.login,
		variables
	});

	expect(response.data.login.token).toBeTruthy();
}, 60000);

test("should reject 'me' query without authentication", async () => {
	await expect(client.query({ query: userOperations.getMe })).rejects.toThrow();
}, 60000);

test("should hide emails when fetching list of users", async () => {
	const response = await client.query({ query: userOperations.getUsers });

	let emailFound = true;

	response.data.users.forEach(user => {
		emailFound = user.email !== null && emailFound ? true : null;
	});

	expect(emailFound).toBe(null);
}, 60000);
