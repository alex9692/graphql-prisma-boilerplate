const bcrypt = require("bcryptjs");
exports.generateHashPassword = async password => {
	if (password.length < 8)
		throw new Error("Password must be 8 characters or more");
	const hashPassword = await bcrypt.hash(password, 12);
	
	return hashPassword;
};
