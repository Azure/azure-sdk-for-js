// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Demonstrates container create, read, delete and reading all containers belonging to a database.
 */

import "dotenv/config";
import { finish, handleError, logStep, logSampleHeader } from "./Shared/handleError.js";
import type { ContainerDefinition, IndexingPolicy, SpatialIndex } from "@azure/cosmos";
import {
  CosmosClient,
  VectorEmbeddingDataType,
  VectorEmbeddingDistanceFunction,
  VectorIndexType,
} from "@azure/cosmos";

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

  logStep("Update computed properties on an existing container");
  // read current container definition
  const { resource: contDefinition } = await containerWithComputedProperty.read();
  const upperName = {
    name: "upperLastName",
    query:
      "SELECT VALUE UPPER(IS_DEFINED(c.lastName) ? c.lastName : c.parents[0].familyName) FROM c",
  };
  if (contDefinition) {
    // update computed properties
    contDefinition.computedProperties = [upperName];
    // replace container definition with updated computed properties
    await containerWithComputedProperty.replace(contDefinition);
    console.log("Computed properties updated");
  } else {
    console.log("Container definition is undefined.");
  }

  logStep("Create container with vector embedding and indexing policies");
  const vectorEmbeddingPolicy = {
    vectorEmbeddings: [
      {
        path: "/vector1",
        dataType: VectorEmbeddingDataType.UInt8,
        dimensions: 1000,
        distanceFunction: VectorEmbeddingDistanceFunction.Euclidean,
      },
      {
        path: "/vector2",
        dataType: VectorEmbeddingDataType.Int8,
        dimensions: 200,
        distanceFunction: VectorEmbeddingDistanceFunction.DotProduct,
      },
      {
        path: "/vector3",
        dataType: VectorEmbeddingDataType.UInt8,
        dimensions: 400,
        distanceFunction: VectorEmbeddingDistanceFunction.Cosine,
      },
    ],
  };

  const indexingPolicy: IndexingPolicy = {
    automatic: true,
    indexingMode: "consistent",
    compositeIndexes: [
      [
        { path: "/numberField", order: "ascending" },
        { path: "/stringField", order: "descending" },
      ],
    ],
    spatialIndexes: [{ path: "/location/*", types: ["Point", "Polygon"] }] as SpatialIndex[],
    vectorIndexes: [
      { path: "/vector1", type: VectorIndexType.Flat },
      {
        path: "/vector2",
        type: VectorIndexType.QuantizedFlat,
        quantizationByteSize: 2,
        vectorIndexShardKey: ["/Country"],
      },
      {
        path: "/vector3",
        type: VectorIndexType.DiskANN,
        quantizationByteSize: 2,
        indexingSearchListSize: 50,
        vectorIndexShardKey: ["/ZipCode"],
      },
    ],
  };

  const containerDefinition: ContainerDefinition = {
    id: "ContainerWithVectorPolicy",
    partitionKey: { paths: ["/id"] },
    indexingPolicy: indexingPolicy,
    vectorEmbeddingPolicy: vectorEmbeddingPolicy,
  };
  await database.containers.createIfNotExists(containerDefinition);
  console.log("Container with vector embedding and indexing policies created");

  logStep("Create container with full text search container policy");

  // Create a container with full text policy and full text indexes
  const indexingPolicyFTS: IndexingPolicy = {
    automatic: true,
    includedPaths: [{ path: "/*" }],
    excludedPaths: [{ path: '/"_etag"/?' }],
    fullTextIndexes: [{ path: "/text1" }, { path: "/text2" }],
  };

  const fullTextPolicy = {
    defaultLanguage: "en-US",
    fullTextPaths: [
      { path: "/text1", language: "1033" },
      { path: "/text2", language: "en-US" },
    ],
  };

  await database.containers.createIfNotExists({
    id: "ContainerWithFTSPolicy",
    partitionKey: { paths: ["/id"] },
    fullTextPolicy: fullTextPolicy,
    indexingPolicy: indexingPolicyFTS,
  });
  console.log("Container with full text search policy created");

  logStep("Delete all items for a specific partition key");

  // Create a container with partition key on 'state' for the deleteAllItemsForPartitionKey demo
  const { container: containerForDeletion } = await database.containers.createIfNotExists({
    id: "ContainerForDeletion",
    partitionKey: { paths: ["/state"] },
  });

  // Create some sample items with different partition key values
  const cities = [
    { id: "1", name: "Olympia", state: "WA", isCapital: true },
    { id: "2", name: "Redmond", state: "WA", isCapital: false },
    { id: "3", name: "Seattle", state: "WA", isCapital: false },
    { id: "4", name: "Springfield", state: "IL", isCapital: true },
    { id: "5", name: "Chicago", state: "IL", isCapital: false },
  ];

  console.log("Creating sample cities...");
  for (const city of cities) {
    await containerForDeletion.items.create(city);
  }

  // Delete all items for partition key 'WA'
  await containerForDeletion.deleteAllItemsForPartitionKey("WA");
  console.log("Deleted all items for partition key 'WA'");

  // Query to verify items after deletion
  const queryToVerify = "SELECT c.id, c.name, c.state FROM c WHERE c.state = 'WA'";
  const { resources: waItems } = await containerForDeletion.items
    .query(queryToVerify)
    .fetchAll();
  console.log(`Items in WA after deletion: ${waItems.length}`);

  // Clean up the container
  await containerForDeletion.delete();

  await finish();
}

run().catch(handleError);
