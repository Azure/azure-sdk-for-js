// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Demonstrates using a ChangeFeed with PriorityLevel support for entire container, a partition key, and an epk range
 */

import "dotenv/config";
import { finish, handleError, logSampleHeader, logStep } from "../Shared/handleError.js";
import type {
  Container,
  ChangeFeedIteratorOptions,
  ChangeFeedPullModelIterator,
} from "@azure/cosmos";
import {
  CosmosClient,
  PartitionKeyDefinitionVersion,
  StatusCodes,
  ChangeFeedStartFrom,
  PriorityLevel,
} from "@azure/cosmos";

const key = process.env.COSMOS_KEY || "<cosmos key>";
const endpoint = process.env.COSMOS_ENDPOINT || "<cosmos endpoint>";
const databaseId = process.env.COSMOS_DATABASE || "<cosmos database>";
const containerId = process.env.COSMOS_CONTAINER || "<cosmos container>";

logSampleHeader("Change Feed with Priority Level Support");

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

    logStep("Change Feed with Low Priority for entire container");
    let options: ChangeFeedIteratorOptions = {
      maxItemCount: 1,
      changeFeedStartFrom: ChangeFeedStartFrom.Beginning(),
      priorityLevel: PriorityLevel.Low,
    };
    // ingest data to introduce changes to container
    await ingestData(container, 1, 2);
    // fetch the changes from beginning with Low priority
    let continuationToken = await iterateChangeFeedFromBeginning(container, options);
    // ingest more data to container to fetch changes from continuation token
    await ingestData(container, 3, 4);
    await iterateChangeFeedFromContinuationToken(container, continuationToken, PriorityLevel.Low);

    logStep("Change Feed with High Priority for partition key - `sample1`");
    options = {
      maxItemCount: 1,
      changeFeedStartFrom: ChangeFeedStartFrom.Beginning("sample1"),
      priorityLevel: PriorityLevel.High,
    };

    continuationToken = await iterateChangeFeedFromBeginning(container, options);
    // ingest more data to fetch changes from above continuation token
    await ingestData(container, 5, 6);
    await iterateChangeFeedFromContinuationToken(container, continuationToken, PriorityLevel.High);

    logStep("Change Feed with Low Priority for an epk range");
    const epkRanges = await container.getFeedRanges();
    options = {
      maxItemCount: 1,
      changeFeedStartFrom: ChangeFeedStartFrom.Beginning(epkRanges[0]),
      priorityLevel: PriorityLevel.Low,
    };
    continuationToken = await iterateChangeFeedFromBeginning(container, options);
    // ingest more data to fetch changes from above continuation token
    await ingestData(container, 7, 8);
    await iterateChangeFeedFromContinuationToken(container, continuationToken, PriorityLevel.Low);

    logStep("Change Feed with High Priority starting from now");
    options = {
      maxItemCount: 1,
      changeFeedStartFrom: ChangeFeedStartFrom.Now(epkRanges[0]),
      priorityLevel: PriorityLevel.High,
    };
    const iterator = container.items.getChangeFeedIterator(options);
    let nowContinuationToken = "";
    for await (const result of iterator.getAsyncIterator()) {
      if (result.statusCode === StatusCodes.NotModified) {
        nowContinuationToken = result.continuationToken;
        console.log("No new results - starting from now");
        break;
      }
    }

    // ingest more data after we've established the "now" point
    await ingestData(container, 9, 10);
    await iterateChangeFeedFromContinuationToken(
      container,
      nowContinuationToken,
      PriorityLevel.High,
    );
  } catch (err) {
    console.error(err);
  } finally {
    await finish();
  }
}

async function ingestData(container: Container, initialize: number, end: number): Promise<void> {
  for (let i = initialize; i <= end; i++) {
    await container.items.create({ id: `item${i}`, name: `sample1`, key: i });
    await container.items.create({ id: `item${i}`, name: `sample2`, key: i });
    await container.items.create({ id: `item${i}`, name: `sample3`, key: i });
    await container.items.create({ id: `item${i}`, name: `sample4`, key: i });
  }
  console.log(`ingested items with id - item${initialize} to item${end}`);
}

async function iterateChangeFeedFromBeginning(
  container: Container,
  options: ChangeFeedIteratorOptions,
): Promise<string> {
  const iterator = container.items.getChangeFeedIterator(options);
  const priorityLevel = options.priorityLevel || "Default (High)";
  console.log(`fetch changes from beginning with priority level: ${priorityLevel}`);
  return iterateChangeFeed(iterator);
}

async function iterateChangeFeedFromContinuationToken(
  container: Container,
  continuationToken: string,
  priorityLevel: PriorityLevel,
): Promise<void> {
  const options: ChangeFeedIteratorOptions = {
    maxItemCount: 1,
    changeFeedStartFrom: ChangeFeedStartFrom.Continuation(continuationToken),
    priorityLevel,
  };
  const iterator = container.items.getChangeFeedIterator(options);
  const levelStr = priorityLevel === PriorityLevel.Low ? "Low" : "High";
  console.log(`fetch changes from continuation token with priority level: ${levelStr}`);
  await iterateChangeFeed(iterator);
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
        console.log(`Result found: ${result.result?.length || 0} item(s)`);
      }
    } catch (error) {
      console.error("Error occurred: ", error);
    }
  }
  return continuationToken;
}

run().catch(handleError);
