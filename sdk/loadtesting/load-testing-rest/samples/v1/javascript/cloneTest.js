// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to clone an existing load test.
 *
 * @summary Demonstrates how to clone an existing load test.
 */

const AzureLoadTesting = require("@azure-rest/load-testing").default,
  { isUnexpected, getLongRunningPoller } = require("@azure-rest/load-testing");
const { DefaultAzureCredential } = require("@azure/identity");
const { randomUUID } = require("node:crypto");

async function main() {
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
