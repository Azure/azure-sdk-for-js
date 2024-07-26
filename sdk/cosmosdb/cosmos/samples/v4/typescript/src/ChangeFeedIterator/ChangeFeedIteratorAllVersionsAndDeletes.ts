// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * @summary Demonstrates using a ChangeFeed in AllVersionsAndDeletes mode for entire container, a partition key, and an epk range
 */

import * as dotenv from "dotenv";
dotenv.config();

import { finish, handleError, logSampleHeader, logStep } from "../Shared/handleError";
import {
  CosmosClient,
  PartitionKeyDefinitionVersion,
  Container,
  StatusCodes,
  ChangeFeedIteratorOptions,
  ChangeFeedStartFrom,
  ChangeFeedMode,
  ChangeFeedPullModelIterator,
} from "@azure/cosmos";

const key = process.env.COSMOS_KEY || "<cosmos key>";
const endpoint = process.env.COSMOS_ENDPOINT || "<cosmos endpoint>";
const databaseId = process.env.COSMOS_DATABASE || "<cosmos database>";
const containerId = process.env.COSMOS_CONTAINER || "<cosmos container>";

logSampleHeader("Change Feed with All Versions and Deletes mode");

// Establish a new instance of the CosmosClient to be used throughout this demo
const client = new CosmosClient({ endpoint, key });

async function run(): Promise<void> {
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

    logStep("Change Feed for Entire Container");
    let options: ChangeFeedIteratorOptions = {
      maxItemCount: 1,
      changeFeedStartFrom: ChangeFeedStartFrom.Now(),
      changeFeedMode: ChangeFeedMode.AllVersionsAndDeletes,
    };

    await iterateChangeFeedFromNowAndContinuation(container, options, 1, 4);

    logStep("Change Feed for a Partition Key");
    options = {
      maxItemCount: 1,
      changeFeedStartFrom: ChangeFeedStartFrom.Now("sample1"),
      changeFeedMode: ChangeFeedMode.AllVersionsAndDeletes,
    };
    await iterateChangeFeedFromNowAndContinuation(container, options, 5, 8);

    logStep("Change Feed for an epk range");
    const feedRanges = await container.getFeedRanges();
    options = {
      maxItemCount: 1,
      changeFeedStartFrom: ChangeFeedStartFrom.Now(feedRanges[0]),
    };
    await iterateChangeFeedFromNowAndContinuation(container, options, 9, 12);
  } catch (err) {
    console.error(err);
  } finally {
    await finish();
  }
}

async function ingestData(container: Container, initialize: number, end: number) {
  for (let i = initialize; i <= end; i++) {
    await container.items.create({ id: `item${i}`, name: `sample1`, key: i });
    await container.items.create({ id: `item${i}`, name: `sample2`, key: i });
    await container.items.create({ id: `item${i}`, name: `sample3`, key: i });
    await container.items.create({ id: `item${i}`, name: `sample4`, key: i });
  }
  console.log(`ingested items with id - item${initialize} and id - item${end}`);
}

async function insertAndModifyData(container: Container, initialize: number, end: number) {
  await ingestData(container, initialize, end);
  await container.items.upsert({ id: `item${initialize}`, name: `sample1`, key: initialize + 1 });
  console.log(`upserted item with id - item${initialize} and partition key - sample1`);
  await container.item(`item${initialize}`, `sample1`).delete();
  console.log(`deleted item with id - item${initialize} and partition key - sample1`);
}

async function iterateChangeFeedFromNowAndContinuation(
  container: Container,
  options: ChangeFeedIteratorOptions,
  initialize: number,
  end: number,
): Promise<void> {
  let iterator = container.items.getChangeFeedIterator(options);
  console.log("running the iterator to start fetching changes from now.");
  await iterator.readNext();
  // ingest, upsert, and delete some data to introduce changes to container
  await insertAndModifyData(container, initialize, initialize + 1);
  // fetch the changes, and continuation token so that we can start from the same point in time
  const continuationToken = await iterateChangeFeed(iterator);
  options = {
    maxItemCount: 1,
    changeFeedStartFrom: ChangeFeedStartFrom.Continuation(continuationToken),
    changeFeedMode: ChangeFeedMode.AllVersionsAndDeletes,
  };
  iterator = container.items.getChangeFeedIterator(options);
  // insert and modify some new data after fetching the continuation token
  await insertAndModifyData(container, initialize + 2, end);
  console.log("fetching changefeed from the continuation token");
  await iterateChangeFeed(iterator, continuationToken);
}

async function iterateChangeFeed(
  iterator: ChangeFeedPullModelIterator<any>,
  continuationToken: string = "",
): Promise<string> {
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
