import ApolloBoost from "apollo-boost";

exports.getClient = jwt => {
	return new ApolloBoost({
		uri: "http://localhost:3000",
		request(operation) {
			if (jwt) {
				operation.setContext({
					headers: {
						Authorization: `Bearer ${jwt}`
					}
				});
			}
		}
	});
};
