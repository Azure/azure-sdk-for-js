// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to create a load test
 *
 * @summary Demonstrates how to create a load test
 */

import AzureLoadTesting /* , { isUnexpected }*/ from "@azure-rest/load-testing";
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

  const testId = randomUUID(); // ID to be assigned to a test
  const displayName = "Sample Load Test";
  const description = "Sample Test Description";

  // Build a client through AAD
  const client = AzureLoadTesting(endpoint, credential);

  // Creating the Load test
  await client.path("/tests/{testId}", testId).patch({
    contentType: "application/merge-patch+json",
    body: {
      displayName: displayName,
      description: description,
      loadTestConfiguration: {
        engineInstances: 1, // number of engine instances to run test
      },
    },
  });
}

main().catch(console.error);
