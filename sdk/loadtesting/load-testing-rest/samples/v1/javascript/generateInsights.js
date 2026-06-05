// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to generate Actionable insights for a completed test run.
 *
 * @summary Demonstrates how to generate insights for a completed test run.
 */

const AzureLoadTesting = require("@azure-rest/load-testing").default,
  { isUnexpected, getLongRunningPoller } = require("@azure-rest/load-testing");
const { DefaultAzureCredential } = require("@azure/identity");

async function main() {
  const endpoint = process.env["LOADTESTSERVICE_ENDPOINT"] || "";
  const credential = new DefaultAzureCredential();
  const testRunId = process.env["LOADTESTSERVICE_TESTRUNID"] || ""; // TestRunId of a completed test run.

  const client = AzureLoadTesting(endpoint, credential);

  // Generate insights for the completed test run
  const generateResult = await client
    .path("/test-runs/{testRunId}/insights:generate", testRunId)
    .post();

  if (isUnexpected(generateResult)) {
    throw generateResult.body.error;
  }

  // Insights generation returns 202 Accepted (LRO). Poll until complete.
  const insightsPoller = await getLongRunningPoller(client, generateResult);
  await insightsPoller.pollUntilDone();

  // Retrieve the generated insights
  const insightsResult = await client
    .path("/test-runs/{testRunId}/insights/latest", testRunId)
    .get();

  if (isUnexpected(insightsResult)) {
    throw insightsResult.body.error;
  }

  console.log("Insights generated successfully.");
  console.log(JSON.stringify(insightsResult.body, null, 2));
}

main().catch(console.error);
