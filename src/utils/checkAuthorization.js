const jwt = require("jsonwebtoken");

exports.authMiddleware = async (resolve, parent, args, context, info) => {
	const { prisma, request } = context;

	const headers = request.headers
		? request.headers.authorization
		: request.context.Authorization;

	if (
		info.operation.operation === "query" ||
		(info.operation.operation === "mutation" && info.path.key === "email")
	) {
		if (!headers) return resolve();
	} else if (!headers) {
		throw new Error("Authentication required!! Please login");
	}

	const token = headers.split(" ")[1];

	const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
	if (!decoded) throw new Error("Invalid token!!");

	const user = await prisma.query.user({ where: { id: decoded.id } });
	if (!user) throw new Error("User doesn't exist");

	request.user = user;
	return resolve();
};
