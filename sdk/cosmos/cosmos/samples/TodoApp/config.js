const config = {};

config.host = process.env.HOST || "https://localhost:8081/";
config.authKey =
  process.env.AUTH_KEY || "C2y6yDjf5/R+ob0N8A7Cgv30VRDJIWEHLM+4QDU5DE2nQ9nDuVTqobD4b8mGGyPMbIZnqyMsEcaGQy67XIw/Jw==";
config.databaseId = "ToDoList";
config.collectionId = "Items";

if (config.host.includes("https://localhost:")) {
  console.log("WARNING: Disabled checking of self-signed certs. Do not have this code in production.");
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
}

module.exports = config;
