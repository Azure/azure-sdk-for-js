// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import { finish, handleError, logStep, logSampleHeader } from "./Shared/handleError";
import { CosmosClient } from "../dist";
import { database as databaseId, container as containerId, endpoint, key } from "./Shared/config";

logSampleHeader("Container Management");

// Establish a new instance of the CosmosClient to be used throughout this demo
const client = new CosmosClient({ endpoint, key });

// ensuring a database exists for us to work with
async function run(): Promise<void> {
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
