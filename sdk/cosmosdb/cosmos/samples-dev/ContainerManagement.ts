// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * @summary Demonstrates container create, read, delete and reading all containers belonging to a database.
 */

import * as dotenv from "dotenv";
dotenv.config();

import { finish, handleError, logStep, logSampleHeader } from "./Shared/handleError";
import { CosmosClient } from "@azure/cosmos";
const key = process.env.COSMOS_KEY || "<cosmos key>";
const endpoint = process.env.COSMOS_ENDPOINT || "<cosmos endpoint>";
const databaseId = process.env.COSMOS_DATABASE || "<cosmos database>";
const containerId = process.env.COSMOS_CONTAINER || "<cosmos container>";
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
  console.log(
    `Container with url "${container.url}" was found its id is "${containerDef && containerDef.id}`
  );

  logStep(`Delete container ${containerDef && containerDef.id}`);
  await container.delete();
  await finish();
}

run().catch(handleError);
