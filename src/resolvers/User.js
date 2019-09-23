module.exports.User = {
	email: {
		fragment: "fragment userId on User { id }",
		resolve(parent, args, context, info) {
			const { request } = context;
			const { user } = request;
			if (user && user.id === parent.id) {
				return parent.email;
			}
			return null;
		}
	},
	password(parent, args, context, info) {
		return "";
	}
};
