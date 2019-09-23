require("@babel/polyfill/noConflict");
const server = require("./server");

server.start({ port: process.env.PORT || 3000 }, () => {
	console.log("server is up");
});
