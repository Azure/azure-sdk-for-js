// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * @summary Updates a container offer to change query throughput.
 */

import path from "path";
import * as dotenv from "dotenv";
dotenv.config({ path: path.resolve(__dirname, "../sample.env") });

import { finish, handleError, logStep, logSampleHeader } from "./Shared/handleError";
import {
  CosmosClient,
  OfferDefinition,
  Resource,
  ContainerDefinition,
  DatabaseDefinition,
  FeedResponse
} from "@azure/cosmos";
const key = process.env.COSMOS_KEY || "<cosmos key>";
const endpoint = process.env.COSMOS_ENDPOINT || "<cosmos endpoint>";
const databaseId = process.env.COSMOS_DATABASE || "<cosmos database>";
const containerId = process.env.COSMOS_CONTAINER || "<cosmos container>";

logSampleHeader("Alter Query Throughput");

// Establish a new instance of the CosmosClient to be used throughout this demo
const client = new CosmosClient({ endpoint, key });

// ensuring a database exists for us to work with
async function run(): Promise<void> {
  const { database } = await client.databases.createIfNotExists({ id: databaseId });

  logStep(`Create container with id : ${containerId}`);
  await database.containers.createIfNotExists({ id: containerId });

  logStep("Read all offers issued");
  const { resources: offers } = await client.offers.readAll().fetchAll();

  const newRups = 700;
  await asyncForEach(offers, async (offerDefinition: OfferDefinition) => {
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

async function updateOfferForCollection(
  newRups: number,
  dbName: string,
  collectionName: string,
  oldOfferDefinition: OfferDefinition
): Promise<void> {
  if (!oldOfferDefinition || !oldOfferDefinition.content) throw "found invalid offer";
  const newOfferDefinition: OfferDefinition = {
    ...oldOfferDefinition,
    content: {
      offerThroughput: newRups,
      offerIsRUPerMinuteThroughputEnabled:
        oldOfferDefinition.content.offerIsRUPerMinuteThroughputEnabled
    },
    offerVersion: "V2"
  };

  logStep("Read all databases");
  const { resources: databases } = await client.databases.readAll().fetchAll();

  logStep("Read corresponding containers");
  const containerResponses: FeedResponse<ContainerDefinition & Resource>[] = await Promise.all(
    databases
      .filter((database: DatabaseDefinition & Resource) => database.id === dbName)
      .map((database: DatabaseDefinition & Resource) => {
        return client
          .database(database.id)
          .containers.readAll()
          .fetchAll();
      })
  );

  const containers: (ContainerDefinition & Resource)[] = containerResponses.flatMap(
    (response: FeedResponse<ContainerDefinition & Resource>) => response.resources
  );

  logStep("Finding container to offerDefinition");
  const container = containers.find(
    (containerParam: ContainerDefinition & Resource) =>
      containerParam._rid === oldOfferDefinition.offerResourceId &&
      containerParam.id === collectionName
  );

  if (container) {
    const id = oldOfferDefinition!.id;
    if (typeof id === "undefined") {
      throw new Error("ID for old offer is undefined");
    }
    const offer = client.offer(id);
    logStep("replace old offer with new offer");
    await offer.replace(newOfferDefinition);
  }
}

async function asyncForEach<T>(
  array: Array<T>,
  callback: (element: T, index?: number, array?: T[]) => Promise<void>
): Promise<void> {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index]);
  }
}
