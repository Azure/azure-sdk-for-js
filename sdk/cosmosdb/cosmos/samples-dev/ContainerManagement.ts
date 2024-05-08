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
    `Container with url "${container.url}" was found its id is "${containerDef && containerDef.id}`,
  );

  logStep(`Delete container ${containerDef && containerDef.id}`);
  await container.delete();
  await finish();

  logStep("Create container with vector embedding and indexing policies");
  const vectorEmbeddingPolicy = {
    vectorEmbeddings: [
      {
        path: "/vector1",
        dataType: "float32",
        dimensions: 1000,
        distanceFunction: "euclidean",
      },
      {
        path: "/vector2",
        dataType: "int8",
        dimensions: 200,
        distanceFunction: "dotproduct",
      },
      {
        path: "/vector3",
        dataType: "uint8",
        dimensions: 400,
        distanceFunction: "cosine",
      },
    ],
  };

  const indexingPolicy = {
    automatic: true,
    indexingMode: "consistent",
    compositeIndexes: [
      [
        { path: "/numberField", order: "ascending" },
        { path: "/stringField", order: "descending" },
      ],
    ],
    spatialIndexes: [{ path: "/location/*", types: ["Point", "Polygon"] }],
    vectorIndexes: [
      { path: "/vector1", type: "flat" },
      { path: "/vector2", type: "quantizedFlat" },
      { path: "/vector3", type: "diskANN" },
    ],
  };

  const containerDefinition = {
    id: containerId,
    partitionKey: { path: "/id" },
    indexingPolicy: indexingPolicy,
    vectorEmbeddingPolicy: vectorEmbeddingPolicy,
  };
  await database.containers.createIfNotExists(containerDefinition);
  logStep("Container with vector embedding and indexing policies created");
}

run().catch(handleError);
