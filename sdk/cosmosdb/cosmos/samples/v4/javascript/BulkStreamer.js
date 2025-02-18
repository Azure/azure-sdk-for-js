// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Demonstrates an example of streamable bulk operation.
 */

require("dotenv").config();

const { handleError, finish, logStep } = require("./Shared/handleError");
const { CosmosClient, BulkOperations } = require("@azure/cosmos");
const assert = require("assert");

const key = process.env.COSMOS_KEY || "<cosmos key>";
const endpoint = process.env.COSMOS_ENDPOINT || "<cosmos endpoint>";

async function run() {
  const containerId = "bulkStreamerContainer";
  const client = new CosmosClient({
    key: key,
    endpoint: endpoint,
  });
  const { database } = await client.databases.create({ id: "bulkStreamer db" });
  logStep(`Creating container '${containerId}' with partition key /key`);
  const { container } = await database.containers.create({
    id: containerId,
    partitionKey: {
      paths: ["/key"],
      version: 2,
    },
    throughput: 3000,
  });

  const totalOperations = 5000;
  const chunkSize = 1000;

  logStep("Get instance of bulk streamer");
  const bulkStreamer = container.items.getBulkStreamer();
  let operationPromises = [];

  for (let i = 0; i < totalOperations; i += chunkSize) {
    const operationsChunk = Array.from({ length: chunkSize }, (_, j) => {
      const index = i + j;
      return BulkOperations.getCreateItemOperation(`${index + 1}`, {
        id: `doc${index + 1}`,
        name: `sample${index + 1}`,
        key: `${index + 1}`,
      });
    });
    logStep(`Adding chunk of ${chunkSize} operations to execute starting at document id ${i + 1}`);

    // Execute chunk and obtain list of promises for each operation.
    const executePromises = bulkStreamer.execute(operationsChunk);
    operationPromises.push(...executePromises);
    // process operation result as it resolves
    executePromises.forEach((result) =>
      result.then((result) => assert.equal(result.statusCode, 201)),
    );
  }

  logStep("Wait for all operations to settle...");
  await Promise.allSettled(operationPromises);

  // make sure that all promises are settled before disposing of the bulk streamer
  logStep("Dispose of bulk streamer...");
  bulkStreamer.dispose();
  await container.delete();
  await finish();
}

run().catch(handleError);
