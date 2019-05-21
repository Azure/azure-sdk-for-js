// @ts-check
console.log();
console.log("Azure Cosmos DB Node.js Samples");
console.log("================================");
console.log();
console.log("SERVER SIDE SCRIPTS");
console.log("===================");
console.log();

/*jshint node:true */
("use strict");

const cosmos = require("../../lib/");
const CosmosClient = cosmos.CosmosClient;
const config = require("../Shared/config");
const fs = require("fs");
const databaseId = config.names.database;
const containerId = config.names.container;

const endpoint = config.connection.endpoint;
const masterKey = config.connection.authKey;

// Establish a new instance of the DocumentDBClient to be used throughout this demo
const client = new CosmosClient({ endpoint, auth: { masterKey } });

// Path to stored procedure definition
const sprocDefinition = require("./JS/upsert");

// Execute the stored procedure with the following parameters.
const sprocParams = [
  {
    id: "myDocument",
    foo: "bar"
  }
];

async function run() {
  const { database } = await client.databases.create({ id: databaseId });
  const { container } = await database.containers.create({ id: containerId });

  console.log("Upserting the sproc: '" + sprocDefinition.id + "'");

  // Query for the stored procedure.
  const { sproc, body: sprocDef } = await container.storedProcedures.upsert(sprocDefinition);

  console.log("Executing the sproc: '" + sproc.id + "'");
  console.log("Sproc parameters: " + JSON.stringify(sprocParams));

  const { body: results, headers } = await sproc.execute(sprocParams);
  console.log("//////////////////////////////////");
  if (headers) {
    console.log("// responseHeaders");
    console.log(headers);
  }
  if (results) {
    console.log("// results");
    console.log(results);
  }
  console.log("//////////////////////////////////");

  await database.delete();
  console.log("Database and Collection DELETED"); 
  console.log("Demo finished");
}

run().catch(console.error);
