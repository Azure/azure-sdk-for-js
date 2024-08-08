// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * @summary Demonstrates database create, read, delete and reading all databases.
 */

import * as dotenv from "dotenv";
dotenv.config();

import { handleError, logStep, logSampleHeader, finish } from "./Shared/handleError";
import { CosmosClient } from "@azure/cosmos";
import assert from "assert";

const key = process.env.COSMOS_KEY || "<cosmos key>";
const endpoint = process.env.COSMOS_ENDPOINT || "<cosmos endpoint>";
const databaseId = process.env.COSMOS_DATABASE || "<cosmos database>";

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
  assert.equal(dbDef && dbDef.id, alsoDbDef && alsoDbDef.id); // The bodies will also almost be equal, _ts will defer based on the read time
  // This applies for all response types, not just DatabaseResponse.

  if (dbDef) {
    console.log(`Database with id of ${dbDef.id}' was found`);
  }
  logStep("delete database with id '" + databaseId + "'");
  await finish();
}

run().catch(handleError);
