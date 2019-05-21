exports.connection = {
  endpoint: process.env.COSMOS_SAMPLE_ENDPOINT || "https://localhost:8081/",
  authKey:
    process.env.COSMOS_SAMPLE_ENDPOINT ||
    "C2y6yDjf5/R+ob0N8A7Cgv30VRDJIWEHLM+4QDU5DE2nQ9nDuVTqobD4b8mGGyPMbIZnqyMsEcaGQy67XIw/Jw=="
};

if (exports.connection.endpoint.includes("https://localhost")) {
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
}

exports.names = {
  database: "NodeSamples",
  container: "Data"
};
