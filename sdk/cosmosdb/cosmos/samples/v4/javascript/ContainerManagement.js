// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * @summary Demonstrates container create, read, delete and reading all containers belonging to a database.
 */

require("dotenv").config();

const { finish, handleError, logStep, logSampleHeader } = require("./Shared/handleError");
const { CosmosClient } = require("@azure/cosmos");
const key = process.env.COSMOS_KEY || "<cosmos key>";
const endpoint = process.env.COSMOS_ENDPOINT || "<cosmos endpoint>";
const databaseId = process.env.COSMOS_DATABASE || "<cosmos database>";
const containerId = process.env.COSMOS_CONTAINER || "<cosmos container>";
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
  console.log(
    `Container with url "${container.url}" was found its id is "${containerDef && containerDef.id}`,
  );

  logStep(`Delete container ${containerDef && containerDef.id}`);
  await container.delete();

  logStep("Create container with computed property");
  const lowerName = {
    name: "lowerLastName",
    query:
      "SELECT VALUE LOWER(IS_DEFINED(c.lastName) ? c.lastName : c.parents[0].familyName) FROM c",
  };

  const { container: containerWithComputedProperty } = await database.containers.createIfNotExists({
    id: containerId,
    computedProperties: [lowerName],
  });
  console.log("Container with computed property created");
  const andersenFamily = {
    id: "AndersenFamily",
    lastName: "Andersen",
    parents: [{ firstName: "Thomas" }, { firstName: "Mary Kay" }],
    children: [
      {
        firstName: "Henriette Thaulow",
        gender: "female",
        grade: 5,
        pets: [{ givenName: "Fluffy" }],
      },
    ],
    address: { state: "WA", county: "King", city: "seattle" },
  };
  const wakefieldFamily = {
    id: "WakefieldFamily",
    parents: [
      { familyName: "Wakefield", givenName: "Robin" },
      { familyName: "Miller", givenName: "Ben" },
    ],
    children: [
      {
        familyName: "Merriam",
        givenName: "Jesse",
        gender: "female",
        grade: 1,
        pets: [{ givenName: "Goofy" }, { givenName: "Shadow" }],
      },
      {
        familyName: "Miller",
        givenName: "Lisa",
        gender: "female",
        grade: 8,
      },
    ],
    address: { state: "NY", county: "Manhattan", city: "NY" },
  };
  await containerWithComputedProperty.items.create(andersenFamily);
  await containerWithComputedProperty.items.create(wakefieldFamily);

  const response = await containerWithComputedProperty.items
    .query(`SELECT c.${lowerName.name} FROM c`)
    .fetchAll();
  console.log("computed property query results: ", response.resources);
  await finish();
}

run().catch(handleError);
