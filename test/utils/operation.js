import { gql } from "apollo-boost";

const newUser = gql`
	mutation($data: CreateUserInput!) {
		createUser(data: $data) {
			user {
				id
				name
				email
			}
			token
		}
	}
`;

const getUsers = gql`
	query {
		users {
			id
			name
			email
		}
	}
`;

const login = gql`
	mutation($data: loginData!) {
		login(data: $data) {
			user {
				id
				name
			}
			token
		}
	}
`;

const getMe = gql`
	query {
		me {
			id
			name
			email
			posts {
				id
				title
				body
			}
		}
	}
`;

exports.userOperations = {
	newUser,
	login,
	getUsers,
	getMe
};
