// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * @summary Demonstrates using a ChangeFeed for a partition key with AllVersionsAndDeletes mode
 */

require("dotenv").config();

const { finish, handleError, logSampleHeader, logStep } = require("../Shared/handleError");
const {
  CosmosClient,
  PartitionKeyDefinitionVersion,
  StatusCodes,
  ChangeFeedStartFrom,
  ChangeFeedMode,
} = require("@azure/cosmos");

const key = process.env.COSMOS_KEY || "<cosmos key>";
const endpoint = process.env.COSMOS_ENDPOINT || "<cosmos endpoint>";
const databaseId = process.env.COSMOS_DATABASE || "<cosmos database>";
const containerId = process.env.COSMOS_CONTAINER || "<cosmos container>";

logSampleHeader("Change Feed For Partition Key With AllVersionsAndDeletes Mode");

// Establish a new instance of the CosmosClient to be used throughout this demo
const client = new CosmosClient({ endpoint, key });

async function run() {
  try {
    const { database } = await client.databases.createIfNotExists({ id: databaseId });
    const containerDef = {
      id: containerId,
      partitionKey: {
        paths: ["/name"],
        version: PartitionKeyDefinitionVersion.V1,
      },
      throughput: 11000,
    };
    const { container } = await database.containers.createIfNotExists(containerDef);
    // set change feed iterator options to fetch changes from now in all versions and deletes mode
    let changeFeedIteratorOptions = {
      maxItemCount: 5,
      changeFeedStartFrom: ChangeFeedStartFrom.Now("sample1"),
      changeFeedMode: ChangeFeedMode.AllVersionsAndDeletes,
    };
    let iterator = container.items.getChangeFeedIterator(changeFeedIteratorOptions);
    logStep("Start fetching changes from now");
    let continuationToken = "";
    let res = await iterator.readNext();
    console.log("Result should be empty as no changes are made yet", res.result);
    // insert, upsert, and delete data from container
    await insertAndModifyData(container, 1, 3);
    while (iterator.hasMoreResults) {
      const res = await iterator.readNext();
      if (res.statusCode === StatusCodes.NotModified) {
        // if no new results are found, break the loop and return continuation token
        continuationToken = res.continuationToken;
        break;
      }
      console.log("Results Found: ", res.result);
    }
    // insert, upsert, and delete more data after fetching continuation token
    await insertAndModifyData(container, 3, 5);
    // set change feed iterator options to fetch changes from continuation token in all versions and deletes mode
    changeFeedIteratorOptions = {
      maxItemCount: 5,
      changeFeedStartFrom: ChangeFeedStartFrom.Continuation(continuationToken),
      changeFeedMode: ChangeFeedMode.AllVersionsAndDeletes,
    };
    iterator = container.items.getChangeFeedIterator(changeFeedIteratorOptions);
    logStep("Start fetching changes from continuation token");
    while (iterator.hasMoreResults) {
      const res = await iterator.readNext();
      // break the loop if no new results are found
      if (res.statusCode === StatusCodes.NotModified) {
        break;
      }
      console.log("Results Found: ", res.result);
    }
  } catch (err) {
    console.error(err);
  } finally {
    await finish();
  }
}

async function ingestData(container, initialize, end) {
  console.log(`beginning data ingestion from id - item${initialize} to id - item${end - 1}`);
  for (let i = initialize; i < end; i++) {
    await container.items.create({ id: `item${i}`, name: `sample1`, key: i });
    await container.items.create({ id: `item${i}`, name: `sample2`, key: i });
    await container.items.create({ id: `item${i}`, name: `sample3`, key: i });
    await container.items.create({ id: `item${i}`, name: `sample4`, key: i });
  }
  console.log("ingested items");
}

async function insertAndModifyData(container, initialize, end) {
  await ingestData(container, initialize, end);
  await container.items.upsert({ id: `item${initialize}`, name: `sample1`, key: initialize + 1 });
  console.log(`upserted item with id - item${initialize} and partition key - sample1`);
  await container.item(`item${initialize}`, `sample1`).delete();
  console.log(`deleted item with id - item${initialize} and partition key - sample1`);
}

run().catch(handleError);
