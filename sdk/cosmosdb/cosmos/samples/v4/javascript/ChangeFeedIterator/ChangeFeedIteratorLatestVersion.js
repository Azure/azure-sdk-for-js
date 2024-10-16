// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Demonstrates using a ChangeFeed in LatestVersion mode for entire container, a partition key, and an epk range
 */

require("dotenv").config();

const { finish, handleError, logSampleHeader, logStep } = require("../Shared/handleError");
const {
  CosmosClient,
  PartitionKeyDefinitionVersion,
  StatusCodes,
  ChangeFeedStartFrom,
} = require("@azure/cosmos");

const key = process.env.COSMOS_KEY || "<cosmos key>";
const endpoint = process.env.COSMOS_ENDPOINT || "<cosmos endpoint>";
const databaseId = process.env.COSMOS_DATABASE || "<cosmos database>";
const containerId = process.env.COSMOS_CONTAINER || "<cosmos container>";

logSampleHeader("Change Feed with Latest Version Mode");

// Establish a new instance of the CosmosClient to be used throughout this demo
const client = new CosmosClient({ endpoint, key });

async function run() {
  const { database } = await client.databases.createIfNotExists({ id: databaseId });
  const containerDef = {
    id: containerId,
    partitionKey: {
      paths: ["/name"],
      version: PartitionKeyDefinitionVersion.V1,
    },
    throughput: 11000,
  };
  try {
    const { container } = await database.containers.createIfNotExists(containerDef);
    console.log(`Created container with id : ${containerId}`);

    logStep("Change Feed for entire container");
    let options = {
      maxItemCount: 1,
      changeFeedStartFrom: ChangeFeedStartFrom.Beginning(),
    };
    // ingest data to introduce changes to container
    await ingestData(container, 1, 2);
    // fetch the changes from beginning, and get the continuation token to fetch further changes made to container after this iteration.
    let continuationToken = await iterateChangeFeedFromBeginning(container, options);
    // ingest more data to container to fetch changes from continuation token
    await ingestData(container, 3, 4);
    await iterateChangeFeedFromContinuationToken(container, continuationToken);

    logStep("Change Feed for partition key -`sample1`");
    options = {
      maxItemCount: 1,
      changeFeedStartFrom: ChangeFeedStartFrom.Beginning("sample1"),
    };

    continuationToken = await iterateChangeFeedFromBeginning(container, options);
    // ingest more data to fetch changes from above continuation token
    await ingestData(container, 5, 6);
    await iterateChangeFeedFromContinuationToken(container, continuationToken);

    logStep("Change Feed for an epk range");
    const epkRanges = await container.getFeedRanges();
    options = {
      maxItemCount: 1,
      changeFeedStartFrom: ChangeFeedStartFrom.Beginning(epkRanges[0]),
    };
    continuationToken = await iterateChangeFeedFromBeginning(container, options);
    // ingest more data to fetch changes from above continuation token
    await ingestData(container, 7, 8);
    await iterateChangeFeedFromContinuationToken(container, continuationToken);
  } catch (err) {
    console.error(err);
  } finally {
    await finish();
  }
}

async function ingestData(container, initialize, end) {
  for (let i = initialize; i <= end; i++) {
    await container.items.create({ id: `item${i}`, name: `sample1`, key: i });
    await container.items.create({ id: `item${i}`, name: `sample2`, key: i });
    await container.items.create({ id: `item${i}`, name: `sample3`, key: i });
    await container.items.create({ id: `item${i}`, name: `sample4`, key: i });
  }
  console.log(`ingested items with id - item${initialize} and id - item${end}`);
}

async function iterateChangeFeedFromBeginning(container, options) {
  let iterator = container.items.getChangeFeedIterator(options);
  console.log("fetch changes from beginning");
  return iterateChangeFeed(iterator);
}

async function iterateChangeFeedFromContinuationToken(container, continuationToken) {
  const options = {
    maxItemCount: 1,
    changeFeedStartFrom: ChangeFeedStartFrom.Continuation(continuationToken),
  };
  const iterator = container.items.getChangeFeedIterator(options);
  console.log("fetch changes from continuation token");
  await iterateChangeFeed(iterator);
}

async function iterateChangeFeed(iterator, continuationToken = "") {
  for await (const result of iterator.getAsyncIterator()) {
    // infinite loop to check for new results.
    try {
      if (result.statusCode === StatusCodes.NotModified) {
        // If no new results are found, break the loop and return the continuation token
        continuationToken = result.continuationToken;
        console.log("No new results");
        break;
      } else {
        console.log("Result found: ", result.result);
      }
    } catch (error) {
      console.error("Error occurred: ", error);
    }
  }
  return continuationToken;
}

run().catch(handleError);
