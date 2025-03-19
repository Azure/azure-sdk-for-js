// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to run a test profile and get recommendations from it.
 *
 * @summary Demonstrates how to start a test profile run.
 */

import AzureLoadTesting, { isUnexpected, getLongRunningPoller } from "@azure-rest/load-testing";
import { DefaultAzureCredential } from "@azure/identity";
import { randomUUID } from "node:crypto";

async function main(): Promise<void> {
  /**
   * The dataplane endpoint for the Azure Load Testing resource.
   * Refer to https://learn.microsoft.com/rest/api/loadtesting/data-plane-uri to understand how to obtain the data-plane endpoint.
   */
  const endpoint = process.env["LOADTESTSERVICE_ENDPOINT"] || "";

  /** Microsoft Entra ID authentication */
  /**
   * In this sample you can populate the three AZURE_CLIENT_ID, AZURE_CLIENT_SECRET & AZURE_TENANT_ID variables for Microsoft Entra ID auth
   */
  const credential = new DefaultAzureCredential();
  const testProfileId = process.env["LOADTESTSERVICE_TESTPROFILEID"] || ""; // TestProfileId of a test profile already created.

  const testProfileRunId = randomUUID(); // Random ID for the Test Profile Run
  const displayName = "Sample Test Profile Run";

  // Build a client through AAD
  const client = AzureLoadTesting(endpoint, credential);

  // Creating the test profile run
  const testProfileRunCreationResult = await client
    .path("/test-profile-runs/{testProfileRunId}", testProfileRunId)
    .patch({
      contentType: "application/merge-patch+json",
      body: {
        testProfileId: testProfileId,
        displayName: displayName,
      },
    });

  if (isUnexpected(testProfileRunCreationResult)) {
    throw testProfileRunCreationResult.body.error;
  }

  let testProfileRunResult;

  const testProfileRunPoller = await getLongRunningPoller(client, testProfileRunCreationResult);
  try {
    testProfileRunResult = await testProfileRunPoller.pollUntilDone({
      abortSignal: AbortSignal.timeout(10 * 60000), // timeout of 10 minutes
    });
  } catch (ex: any) {
    new Error("Error in polling for test profile run completion: " + ex.message); // Polling timed out
  }

  if (testProfileRunPoller.getOperationState().status !== "succeeded") {
    throw new Error(
      "There is some issue in running the test profile, Error Response : " + testProfileRunResult,
    );
  }

  if (testProfileRunResult) {
    const recommendations = testProfileRunResult.body.recommendations;

    if (recommendations && recommendations[0]) {
      const throughputOptimizedRecommendation = recommendations.filter(
        (r) => r.category === "ThroughputOptimized",
      )[0];
      console.log(
        "Throughput optimized configuration: " + throughputOptimizedRecommendation.configurations,
      );
    }
  }
}
main().catch(console.error);
