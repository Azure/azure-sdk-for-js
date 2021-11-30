// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * @summary Updates a container offer to change query throughput.
 */

const path = require("path");
require("dotenv").config();

const { finish, handleError, logStep, logSampleHeader } = require("./Shared/handleError");
const { CosmosClient } = require("@azure/cosmos");
const key = process.env.COSMOS_KEY || "<cosmos key>";
const endpoint = process.env.COSMOS_ENDPOINT || "<cosmos endpoint>";
const databaseId = process.env.COSMOS_DATABASE || "<cosmos database>";
const containerId = process.env.COSMOS_CONTAINER || "<cosmos container>";

logSampleHeader("Alter Query Throughput");

// Establish a new instance of the CosmosClient to be used throughout this demo
const client = new CosmosClient({ endpoint, key });

// ensuring a database exists for us to work with
async function run() {
  const { database } = await client.databases.createIfNotExists({ id: databaseId });

  logStep(`Create container with id : ${containerId}`);
  await database.containers.createIfNotExists({ id: containerId });

  logStep("Read all offers issued");
  const { resources: offers } = await client.offers.readAll().fetchAll();

  const newRups = 700;
  await asyncForEach(offers, async (offerDefinition) => {
    await updateOfferForCollection(newRups, databaseId, containerId, offerDefinition);
  });

  logStep("Read all containers in database");
  const iterator = database.containers.readAll();
  const { resources: containersList } = await iterator.fetchAll();
  console.log(" --- Priting via iterator.fetchAll()");
  console.log(containersList);

  logStep("Read container definition");
  const container = database.container(containerId);
  const { resource: containerDef } = await container.read();

  const resultId = containerDef && containerDef.id;

  console.log(`Container with url "${container.url}" was found its id is "${resultId}`);

  logStep(`Delete container ${resultId}`);
  await container.delete();
  await finish();
}

run().catch(handleError);

async function updateOfferForCollection(newRups, dbName, collectionName, oldOfferDefinition) {
  if (!oldOfferDefinition || !oldOfferDefinition.content) throw "found invalid offer";
  const newOfferDefinition = {
    ...oldOfferDefinition,
    content: {
      offerThroughput: newRups,
      offerIsRUPerMinuteThroughputEnabled:
        oldOfferDefinition.content.offerIsRUPerMinuteThroughputEnabled,
    },
    offerVersion: "V2",
  };

  logStep("Read all databases");
  const { resources: databases } = await client.databases.readAll().fetchAll();

  logStep("Read corresponding containers");
  const containerResponses = await Promise.all(
    databases
      .filter((database) => database.id === dbName)
      .map((database) => {
        return client.database(database.id).containers.readAll().fetchAll();
      })
  );

  const containers = containerResponses.flatMap((response) => response.resources);

  logStep("Finding container to offerDefinition");
  const container = containers.find(
    (containerParam) =>
      containerParam._rid === oldOfferDefinition.offerResourceId &&
      containerParam.id === collectionName
  );

  if (container) {
    const id = oldOfferDefinition.id;
    if (typeof id === "undefined") {
      throw new Error("ID for old offer is undefined");
    }
    const offer = client.offer(id);
    logStep("replace old offer with new offer");
    await offer.replace(newOfferDefinition);
  }
}

async function asyncForEach(array, callback) {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index]);
  }
}
