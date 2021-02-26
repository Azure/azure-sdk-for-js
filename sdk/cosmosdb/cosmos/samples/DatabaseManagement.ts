// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import { handleError, logStep, logSampleHeader, finish } from "./Shared/handleError";
import { CosmosClient } from "../dist";
import { endpoint, key, database as databaseId } from "./Shared/config";
// eslint-disable-next-line @typescript-eslint/tslint/config
import assert from "assert";

logSampleHeader("Database Management");

// Establish a new instance of the CosmosClient to be used throughout this demo
const client = new CosmosClient({ endpoint, key });

async function run(): Promise<void> {
  logStep("Create database, if it doesn't already exist");
  await client.databases.createIfNotExists({ id: databaseId });
  console.log("Database with id " + databaseId + " created.");

  logStep("Read all databases");
  const { resources: dbDefList } = await client.databases.readAll().fetchAll();
  console.log(dbDefList);

  logStep("ReadDatabase with id '" + databaseId + "'");
  const { resource: dbDef } = await client.database(databaseId).read();
  // This uses Object deconstruction to just grab the body of the response,
  // but you can also grab the whole response object to use
  const databaseResponse = await client.database(databaseId).read();
  const alsoDbDef = databaseResponse.resource;
  assert.equal(dbDef.id, alsoDbDef.id); // The bodies will also almost be equal, _ts will defer based on the read time
  // This applies for all response types, not just DatabaseResponse.

  console.log("Database with id of " + dbDef.id + "' was found");

  logStep("delete database with id '" + databaseId + "'");
  await finish();
}

run().catch(handleError);
