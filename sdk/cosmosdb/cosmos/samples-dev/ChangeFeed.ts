// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * @summary Demonstrates using a ChangeFeed.
 */

import path from "path";
import * as dotenv from "dotenv";
dotenv.config({ path: path.resolve(__dirname, "../sample.env") });

import { finish, handleError, logSampleHeader } from "./Shared/handleError";
import { CosmosClient } from "@azure/cosmos";
const key = process.env.COSMOS_KEY || "<cosmos key>";
const endpoint = process.env.COSMOS_ENDPOINT || "<cosmos endpoint>";
const databaseId = process.env.COSMOS_DATABASE || "<cosmos database>";
const containerId = process.env.COSMOS_CONTAINER || "<cosmos container>";

logSampleHeader("Change Feed");
// Establish a new instance of the CosmosClient to be used throughout this demo
const client = new CosmosClient({ endpoint, key });

// We'll use the same pk value for all these samples
const pk = "0";

function doesMatch(actual: any[], expected: any[]): string {
  for (let i = 0; i < actual.length; i++) {
    if (actual[i] !== expected[i]) {
      return "❌";
    }
  }
  return "✅";
}

function logResult(scenario: string, actual: any[], expected: any[]): void {
  const status = doesMatch(actual, expected);
  console.log(
    `  ${status} ${scenario} - expected: [${expected.join(", ")}] - actual: [${actual.join(", ")}]`
  );
}

async function run(): Promise<void> {
  const { database } = await client.databases.createIfNotExists({ id: databaseId });
  const { container } = await database.containers.createIfNotExists({
    id: containerId,
    partitionKey: { paths: ["/pk"] }
  });

  try {
    console.log(`
✨✨✨ Change Feed Samples ✨✨✨

  There are 4 scenarios for change feed:
      1. Start from a specific continuation
      2. Start from a specific point in time
      3. Start from the beginning
      4. Start from now

  All 4 scenarios will eventually catch up to each other if read for long enough

  In this sample, we expect the scenario to see the following items, by id:
    1. [3]
    2. [2, 3]
    3. [1, 2, 3]
    4. []

  After we've read to this point, if we insert a new item id 4, we expect all of them to see it, since they will all be caught up.
`);

    console.log("📢 Phase 1: All scenarios see different results ");

    await container.items.create({ id: "1", pk });
    console.log("  👉 Inserted id=1");

    const now = new Date();
    console.log("  👉 Saved timestamp for the specific point in time scenario");
    const { headers } = await container.items.create({ id: "2", pk });
    const lsn = headers["lsn"];
    console.log(`  👉 Inserted id=2 after timestamp with LSN of ${lsn}`);

    await container.items.create({ id: "3", pk });

    console.log(`  👉 Inserted id=3`);

    const specificContinuationIterator = container.items.changeFeed(pk, {
      continuation: lsn.toString()
    });
    const specificPointInTimeIterator = container.items.changeFeed(pk, { startTime: now });
    const fromBeginningIterator = container.items.changeFeed(pk, { startFromBeginning: true });
    const fromNowIterator = container.items.changeFeed(pk, {});

    const { result: specificContinuationResult } = await specificContinuationIterator.fetchNext();

    logResult(
      "initial specific Continuation scenario",
      [3],
      specificContinuationResult.map((v) => parseInt(v.id))
    );

    // First page is empty. It is catching up to a valid continuation.
    const { result: shouldBeEmpty } = await specificPointInTimeIterator.fetchNext();
    logResult(
      "initial specific point in time scenario should be empty while it finds the right continuation",
      [],
      shouldBeEmpty.map((v) => parseInt(v.id))
    );
    // Second page should have results
    const { result: specificPointInTimeResults } = await specificPointInTimeIterator.fetchNext();
    logResult(
      "second specific point in time scenario should have caught up now",
      [2, 3],
      specificPointInTimeResults.map((v) => parseInt(v.id))
    );

    const { result: fromBeginningResults } = await fromBeginningIterator.fetchNext();
    logResult(
      "initial from beginning scenario",
      [1, 2, 3],
      fromBeginningResults.map((v) => parseInt(v.id))
    );

    const { result: fromNowResultsShouldBeEmpty } = await fromNowIterator.fetchNext();
    logResult(
      "initial from now scenario should be empty",
      [],
      fromNowResultsShouldBeEmpty.map((v) => parseInt(v.id))
    );

    // Now they should all be caught up to the point after id=3, so if we insert a id=4, they should all get it.
    console.log("📢 Phase 2: All scenarios are caught up and should see the same results");

    await container.items.create({ id: "4", pk });
    console.log("  👉 Inserting id=4 - all scenarios should see this");

    const { result: specificContinuationResult2 } = await specificContinuationIterator.fetchNext();
    logResult(
      "after insert, Specific Continuation scenario",
      [4],
      specificContinuationResult2.map((v) => parseInt(v.id))
    );

    const { result: specificPointInTimeResults2 } = await specificPointInTimeIterator.fetchNext();
    logResult(
      "after insert, specific point in time scenario",
      [4],
      specificPointInTimeResults2.map((v) => parseInt(v.id))
    );

    const { result: fromBeginningResults2 } = await fromBeginningIterator.fetchNext();
    logResult(
      "after insert, from beginning scenario",
      [4],
      fromBeginningResults2.map((v) => parseInt(v.id))
    );

    const { result: fromNowResults2 } = await fromNowIterator.fetchNext();
    logResult(
      "after insert, from now scenario",
      [4],
      fromNowResults2.map((v) => parseInt(v.id))
    );
  } catch (err) {
    if (err) {
      console.log("Threw, as expected");
    } else {
      throw err;
    }
  } finally {
    await finish();
  }
}
run().catch(handleError);
