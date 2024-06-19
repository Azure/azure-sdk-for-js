// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * @summary Demonstrates using a ChangeFeed for a partition key
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
  ChangeFeedPolicy,
  ChangeFeedRetentionTimeSpan,
  ChangeFeedMode,
} from "@azure/cosmos";
import { randomUUID } from "@azure/core-util";

const key = process.env.COSMOS_KEY || "<cosmos key>";
const endpoint = process.env.COSMOS_ENDPOINT || "<cosmos endpoint>";
const databaseId = process.env.COSMOS_DATABASE || "<cosmos database>";
const containerId = process.env.COSMOS_CONTAINER || "<cosmos container>";

logSampleHeader("Change Feed For Partition Key");

async function ingestData(container: Container, initialize: number, end: number) {
  console.log("beginning data ingestion");
  for (let i = initialize; i < end; i++) {
    await container.items.create({ name: "sample1", key: i });
    await container.items.create({ name: "sample2", key: i });
    await container.items.create({ name: "sample3", key: i });
    await container.items.create({ name: "sample4", key: i });
  }
  console.log("ingested items");
}

async function insertAndModifyData(container: Container, initialize: number, end: number) {
  await ingestData(container, initialize, end);
  await container.items.upsert({ id: `item${initialize}`, name: `sample1`, key: initialize + 1 });
  console.log(`upserted item with id - item${initialize} and partition key - sample1`);
  await container.item(`item${initialize}`, `sample1`).delete();
  console.log(`deleted item with id - item${initialize} and partition key - sample1`);
}

async function waitFor(milliseconds: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
}

// Establish a new instance of the CosmosClient to be used throughout this demo
const client = new CosmosClient({ endpoint, key });

async function iterateChangeFeedTillNow(container: Container): Promise<string> {
  console.log("fetching changefeed until now");

  const changeFeedIteratorOptions: ChangeFeedIteratorOptions = {
    maxItemCount: 1,
    changeFeedStartFrom: ChangeFeedStartFrom.Beginning("sample1"), //sample1 is the partition key value
  };
  let continuationToken: string = "";

  for await (const result of container.items
    .getChangeFeedIterator(changeFeedIteratorOptions)
    .getAsyncIterator()) {
    // infinite loop to check for new results.
    try {
      if (result.statusCode === StatusCodes.NotModified) {
        // If no new results are found, break the loop and return the continuation token
        continuationToken = result.continuationToken;
        console.log("No new results");
        break;
      } else {
        console.log("Result found", result.result);
      }
    } catch (error) {
      console.error("Error occurred", error);
    }
  }
  return continuationToken;
}

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
    logStep("Implementing Change Feed With Latest Version Mode");
    const { container } = await database.containers.createIfNotExists(containerDef);
    console.log("Container created");

    await ingestData(container, 1, 11);

    // fetch the continuation token, so that we can start from the same point in time
    const continuationToken = await iterateChangeFeedTillNow(container);

    const changeFeedIteratorOptions: ChangeFeedIteratorOptions = {
      maxItemCount: 1,
      changeFeedStartFrom: ChangeFeedStartFrom.Continuation(continuationToken),
    };
    // ingest some new data after fetching the continuation token
    await ingestData(container, 11, 21);
    console.log("Starting fetching changes from continuation token");
    for await (const result of container.items
      .getChangeFeedIterator(changeFeedIteratorOptions)
      .getAsyncIterator()) {
      // infinite loop to check for new results.
      try {
        if (result.statusCode === StatusCodes.NotModified) {
          // if no new changes are found, wait for 5 seconds and try again
          console.log("No new results, waiting for 5 seconds");
          await waitFor(5000);
          break;
        } else {
          console.log("Result found", result.result);
        }
      } catch (error) {
        console.error("Error occurred", error);
      }
    }
    // AllVersionsAndDeletesChangeFeedMode
    logStep("Implementing change feed with AllVersionsAndDeletesChangeFeedMode");
    const changeFeedPolicy = new ChangeFeedPolicy(ChangeFeedRetentionTimeSpan.fromMinutes(5));
    const containerDefWithChangeFeedPolicy = {
      id: randomUUID(),
      partitionKey: {
        paths: ["/name"],
        version: PartitionKeyDefinitionVersion.V1,
      },
      changeFeedPolicy: changeFeedPolicy,
      throughput: 11000,
    };
    try {
      const { container } = await database.containers.createIfNotExists(
        containerDefWithChangeFeedPolicy,
      );
      const changeFeedIteratorOptions = {
        maxItemCount: 5,
        changeFeedStartFrom: ChangeFeedStartFrom.Now("sample1"),
        changeFeedMode: ChangeFeedMode.AllVersionsAndDeletes,
      };
      const iterator = container.items.getChangeFeedIterator(changeFeedIteratorOptions);
      console.log("Start fetching changes from now");
      await insertAndModifyData(container, 1, 5);
      let continuationToken = "";
      while (iterator.hasMoreResults) {
        const res = await iterator.readNext();
        if (res.statusCode === StatusCodes.NotModified) {
          continuationToken = res.continuationToken;
          break;
        }
        console.log("Results Found: ", res.result);
      }
      await insertAndModifyData(container, 5, 10);
      const changeFeedIteratorOptions2 = {
        maxItemCount: 1,
        changeFeedStartFrom: ChangeFeedStartFrom.Continuation(continuationToken),
        changeFeedMode: ChangeFeedMode.AllVersionsAndDeletes,
      };
      const iterator2 = container.items.getChangeFeedIterator(changeFeedIteratorOptions2);
      console.log("Start fetching changes from continuation token");
      while (iterator2.hasMoreResults) {
        const res = await iterator2.readNext();
        console.log("Results Found: ", res.result);
      }
    } catch (error) {
      console.error(error);
    }
  } catch (err) {
    console.error(err);
  } finally {
    await finish();
  }
}
run().catch(handleError);
