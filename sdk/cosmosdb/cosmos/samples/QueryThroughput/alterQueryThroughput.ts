// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import { finish, handleError, logStep, logSampleHeader } from "../Shared/handleError";
import {
  CosmosClient,
  OfferDefinition,
  Resource,
  ContainerDefinition,
  DatabaseDefinition,
  FeedResponse
} from "../../dist";
import { database as databaseId, container as containerId, endpoint, key } from "../Shared/config";

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
  console.log(`Container with url "${container.url}" was found its id is "${containerDef.id}`);

  logStep(`Delete container ${containerDef.id}`);
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
  const oldRups = oldOfferDefinition.content.offerThroughput;
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

  const containers: (ContainerDefinition & Resource)[] = flat(
    containerResponses.map(
      (response: FeedResponse<ContainerDefinition & Resource>) => response.resources
    )
  );

  logStep("Finding container to offerDefinition");
  const container = containers.find(
    (container: ContainerDefinition & Resource) =>
      container._rid === oldOfferDefinition.offerResourceId && container.id === collectionName
  );

  if (container) {
    const offer = client.offer(oldOfferDefinition.id);
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

const flat = <T>(nestedArrays: T[][]): T[] => [].concat(...nestedArrays);
