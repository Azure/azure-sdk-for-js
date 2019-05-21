// @ts-check
"use strict";
console.log();
console.log("Azure Cosmos DB Node.js Samples");
console.log("================================");
console.log();
console.log("DATABASE MANAGEMENT");
console.log("===================");
console.log();

const assert = require("assert");
const cosmos = require("../../lib/");
const CosmosClient = cosmos.CosmosClient;
const config = require("../Shared/config");
const databaseId = config.names.database;

const endpoint = config.connection.endpoint;
const masterKey = config.connection.authKey;

// Establish a new instance of the CosmosClient to be used throughout this demo
const client = new CosmosClient({ endpoint, auth: { masterKey } });

//---------------------------------------------------------------------------------------------------
// This demo performs the following CRUD operations on a Database
//
// 1. create Database    - If the database was not found, try create it
// 2. read all Databases     - Once the database was created, list all the databases on the account
// 3. read Database      - Read a database by its id
// 4. delete Database    - Delete a database given its id
//
//---------------------------------------------------------------------------------------------------

async function run() {
  // 1.
  console.log("\n1. Create database, if it doesn't already exist '" + databaseId + "'");
  await client.databases.createIfNotExists({ id: databaseId });
  console.log("Database with id " + databaseId + " created.");

  // 2.
  console.log("\n2. Read all databases");
  const { result: dbDefList } = await client.databases.readAll().toArray();
  console.log(dbDefList);

  // 3.
  console.log("\n3. readDatabase - with id '" + databaseId + "'");
  const { body: dbDef } = await client.database(databaseId).read();
  // This uses Object deconstruction to just grab the body of the response,
  // but you can also grab the whole response object to use
  const databaseResponse = await client.database(databaseId).read();
  const alsoDbDef = databaseResponse.body;
  assert.equal(dbDef.id, alsoDbDef.id); // The bodies will also almost be equal, _ts will defer based on the read time
  // This applies for all response types, not just DatabaseResponse.

  console.log("Database with id of " + dbDef.id + "' was found");

  // 4.
  console.log("\n4. delete database with id '" + databaseId + "'");
  await client.database(databaseId).delete();

  await finish();
}

function handleError(error) {
  console.log();
  console.log("An error with code '" + error.code + "' has occurred:");
  console.log("\t" + error.body || error);
  console.log();

  finish();
}

function finish() {
  console.log();
  console.log("End of demo.");
}

run().catch(handleError);
