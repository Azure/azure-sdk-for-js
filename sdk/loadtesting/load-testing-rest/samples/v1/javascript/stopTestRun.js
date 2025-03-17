// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to stop a test run's execution
 *
 * @summary Demonstrates how to stop a running load test
 */

const AzureLoadTesting = require("@azure-rest/load-testing").default,
  { isUnexpected } = require("@azure-rest/load-testing");
const { DefaultAzureCredential } = require("@azure/identity");

async function main() {
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
  const testRunId = process.env["LOADTESTSERVICE_TESTRUNID"] || ""; // TestRunId of an already started test run

  // Build a client through AAD
  const client = AzureLoadTesting(endpoint, credential);

  const stopTestRunResult = await client.path("/test-runs/{testRunId}:stop", testRunId).post();

  if (isUnexpected(stopTestRunResult)) {
    throw stopTestRunResult.body.error;
  }
}
main().catch(console.error);
