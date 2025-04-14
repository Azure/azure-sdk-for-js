// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to stop a test profile run's execution
 *
 * @summary Demonstrates how to stop a running test profile run
 */

import AzureLoadTesting, { isUnexpected } from "@azure-rest/load-testing";
import { DefaultAzureCredential } from "@azure/identity";

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
  const testProfileRunId = process.env["LOADTESTSERVICE_TESTPROFILERUNID"] || ""; // TestProfileRunId of an already started test profile run

  // Build a client through AAD
  const client = AzureLoadTesting(endpoint, credential);

  const stopTestProfileRunResult = await client
    .path("/test-profile-runs/{testProfileRunId}:stop", testProfileRunId)
    .post();

  if (isUnexpected(stopTestProfileRunResult)) {
    throw stopTestProfileRunResult.body.error;
  }
}
main().catch(console.error);
