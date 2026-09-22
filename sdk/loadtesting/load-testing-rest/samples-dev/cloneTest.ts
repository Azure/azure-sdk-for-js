// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to clone an existing load test.
 *
 * @summary Demonstrates how to clone an existing load test.
 */

import AzureLoadTesting, { isUnexpected, getLongRunningPoller } from "@azure-rest/load-testing";
import { DefaultAzureCredential } from "@azure/identity";
import { randomUUID } from "node:crypto";

async function main(): Promise<void> {
  const endpoint = process.env["LOADTESTSERVICE_ENDPOINT"] || "";
  const credential = new DefaultAzureCredential();
  const testId = process.env["LOADTESTSERVICE_TESTID"] || ""; // TestId of an existing test to clone.
  const clonedTestId = randomUUID();

  const client = AzureLoadTesting(endpoint, credential);

  const cloneResult = await client.path("/tests/{testId}:clone", testId).post({
    body: {
      newTestId: clonedTestId,
      displayName: "Cloned Load Test",
    },
  });

  if (isUnexpected(cloneResult)) {
    throw cloneResult.body.error;
  }

  // Clone returns 202 Accepted (LRO). Poll until complete.
  const clonePoller = await getLongRunningPoller(client, cloneResult);
  await clonePoller.pollUntilDone();

  console.log(`Test cloned successfully. New test ID: ${clonedTestId}`);
}

main().catch(console.error);
