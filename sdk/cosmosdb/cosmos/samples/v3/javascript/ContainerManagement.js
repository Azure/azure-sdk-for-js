// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * @summary Demonstrates container create, read, delete and reading all containers belonging to a database.
 */

const path = require("path");
require("dotenv").config();

const { finish, handleError, logStep, logSampleHeader } = require("./Shared/handleError");
const { CosmosClient } = require("@azure/cosmos");
const {
  COSMOS_DATABASE: databaseId,
  COSMOS_CONTAINER: containerId,
  COSMOS_ENDPOINT: endpoint,
  COSMOS_KEY: key
} = process.env;

logSampleHeader("Container Management");

// Establish a new instance of the CosmosClient to be used throughout this demo
const client = new CosmosClient({ endpoint, key });

// ensuring a database exists for us to work with
async function run() {
  const { database } = await client.databases.createIfNotExists({ id: databaseId });

  logStep(`Create container with id : ${containerId}`);
  await database.containers.createIfNotExists({ id: containerId });

  logStep("Read all containers in database");
  const iterator = database.containers.readAll();
  const { resources: containersList } = await iterator.fetchAll();
  console.log(" --- Priting via iterator.fetchAll()");
  console.log(containersList);

  logStep("Read container definition");
  const container = database.container(containerId);
  const { resource: containerDef } = await container.read();
  console.log(`Container with url "${container.url}" was found its id is "${containerDef.id}`);

  logStep(`Delete container ${containerDef.id}`);
  await container.delete();
  await finish();
}

run().catch(handleError);
