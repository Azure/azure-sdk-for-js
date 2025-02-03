// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to run a test and stop execution
 *
 * @summary creates, run and stop a loadtest
 * @azsdk-weight 10
 */

import AzureLoadTesting, { isUnexpected } from "@azure-rest/load-testing";
import { DefaultAzureCredential } from "@azure/identity";
import { randomUUID } from "node:crypto";

async function main(): Promise<void> {
  const endpoint = process.env["LOADTESTSERVICE_ENDPOINT"] || "";
  const displayName = "some-load-test";
  const testId = randomUUID(); // ID to be assigned to a test
  const testRunId = randomUUID(); // ID to be assigned to a testRun

  // Build a client through AAD
  const client = AzureLoadTesting(endpoint, new DefaultAzureCredential());

  // Patching a load test
  const testCreationResult = await client.path("/tests/{testId}", testId).patch({
    contentType: "application/merge-patch+json",
    body: {
      displayName: displayName,
      description: "",
      loadTestConfiguration: {
        engineInstances: 1, // number of engine instances to run test
      },
    },
  });
  // Checking for error response
  if (isUnexpected(testCreationResult)) {
    throw testCreationResult.body.error;
  }

  if (testCreationResult.body.testId === undefined) {
    throw new Error("Test ID returned as undefined.");
  }

  // Patching the test run
  const testRunCreationResult = await client.path("/test-runs/{testRunId}", testRunId).patch({
    contentType: "application/merge-patch+json",
    body: {
      testId: testId,
      displayName: displayName,
      virtualUsers: 10,
    },
  });

  if (isUnexpected(testRunCreationResult)) {
    throw testRunCreationResult.body.error;
  }

  if (testRunCreationResult.body.testRunId === undefined) {
    throw new Error("Test Run ID returned as undefined.");
  }

  // Checking the test run status
  const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

  await sleep(30000);

  const stopTestRunResult = await client.path("/test-runs/{testRunId}:stop", testRunId).post();

  if (isUnexpected(stopTestRunResult)) {
    throw stopTestRunResult.body.error;
  }
}
main().catch(console.error);
