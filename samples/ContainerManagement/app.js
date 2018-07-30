// @ts-check
"use strict";
console.log();
console.log("Azure Cosmos DB Node.js Samples");
console.log("================================");
console.log();
console.log("container MANAGEMENT");
console.log("=====================");
console.log();

const cosmos = require("../../lib/");
const CosmosClient = cosmos.CosmosClient;
const config = require("../Shared/config");
const databaseId = config.names.database;
const containerId = config.names.container;

const endpoint = config.connection.endpoint;
const masterKey = config.connection.authKey;

// Establish a new instance of the CosmosClient to be used throughout this demo
const client = new CosmosClient({ endpoint, auth: { masterKey } });

//---------------------------------------------------------------------------------
// This demo performs a few steps
// 1. create container  - given an id, create a new container with thedefault indexingPolicy
// 2. read all containers   - example of using the QueryIterator to get a list of containers in a Database
// 3. read container    - Read a container by its _self
// 4. delete container  - given just the container id, delete the container
//---------------------------------------------------------------------------------

//ensuring a database exists for us to work with
async function run() {
  const database = await init(databaseId);

  //1.
  console.log("1. create container with id '" + containerId + "'");
  await database.containers.createIfNotExists({ id: containerId });

  //2.
  console.log("\n2. read all containers in database");
  const iterator = database.containers.readAll();
  const { result: containersList } = await iterator.toArray();
  console.log(" --- Priting via iterator.toArray");
  console.log(containersList);

  //3.
  console.log("\n3. read container definition");
  const container = database.container(containerId);
  const { body: containerDef } = await container.read();

  console.log("container with url '" + container.url + "' was found its id is '" + containerDef.id);

  //4.
  console.log("\n4. deletecontainer '" + containerId + "'");
  await container.delete();
  await finish(database);
}

async function init(databaseId) {
  const { database } = await client.databases.createIfNotExists({ id: databaseId });
  return database;
}

async function handleError(error) {
  console.log("\nAn error with code '" + error.code + "' has occurred:");
  console.log("\t" + error);

  await finish();
}

async function finish(database) {
  try {
    await database.delete();
    console.log("\nEnd of demo.");
  } catch (err) {
    console.log(`Database[${databaseId}] might not have deleted properly. You might need to delete it manually.`);
  }
}

run().catch(handleError);
