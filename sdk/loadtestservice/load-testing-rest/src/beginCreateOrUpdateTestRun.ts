// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { TestRunStatusPoller } from "./models";
import { AzureLoadTestingClient, TestRunCreateOrUpdateParameters } from "./index.js";
import { isUnexpected } from "./isUnexpected";
import { getTestRunPoller } from "./getTestRunPoller";

/**
 * Creates a poller to poll for test run status.
 * @param client - The Load Testing client.
 * @param options - The operation options.
 * @returns A poller which can be called to poll until completion of the job.
 */
export async function beginCreateOrUpdateTestRun(
  client: AzureLoadTestingClient,
  testRunId: string,
  testRunParams: TestRunCreateOrUpdateParameters
): Promise<TestRunStatusPoller> {
  // Creating the test run
  const testRunCreationResult = await client
    .path("/test-runs/{testRunId}", testRunId)
    .patch(testRunParams);

  if (isUnexpected(testRunCreationResult)) {
    throw testRunCreationResult.body.error;
  }

  if (testRunCreationResult.body.testRunId === undefined)
    throw new Error("Test Run ID returned as undefined.");

  return getTestRunPoller(client, testRunCreationResult);
}
