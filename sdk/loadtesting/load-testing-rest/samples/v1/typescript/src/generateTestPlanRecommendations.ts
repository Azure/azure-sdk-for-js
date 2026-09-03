// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to generate AI-powered test plan recommendations
 * using an uploaded browser recording file.
 *
 * @summary Demonstrates how to generate test plan recommendations for a load test.
 */

import AzureLoadTesting, { isUnexpected, getLongRunningPoller } from "@azure-rest/load-testing";
import { DefaultAzureCredential } from "@azure/identity";

async function main(): Promise<void> {
  const endpoint = process.env["LOADTESTSERVICE_ENDPOINT"] || "";
  const credential = new DefaultAzureCredential();
  const testId = process.env["LOADTESTSERVICE_TESTID"] || ""; // TestId of a test with a browser recording file already uploaded.

  const client = AzureLoadTesting(endpoint, credential);

  // Generate test plan recommendations (requires a browser recording file uploaded to the test)
  const generateResult = await client
    .path("/tests/{testId}:generateTestPlanRecommendations", testId)
    .post();

  if (isUnexpected(generateResult)) {
    throw generateResult.body.error;
  }

  // Recommendations generation returns 202 Accepted (LRO). Poll until complete.
  const recommendationsPoller = await getLongRunningPoller(client, generateResult);
  const result = await recommendationsPoller.pollUntilDone();

  console.log(`Recommendations generated successfully.`);
  console.log(JSON.stringify(result.body, null, 2));
}

main().catch(console.error);
