// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to create a load test and then use it to create a test profile.
 *
 * @summary Demonstrates how to create a test profile.
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
  const functionsResourceId = process.env["LOADTESTSERVICE_FUNCTIONSFLEXRESOURCEID"] || ""; // ResourceID of a Azure Function on Flex Consumption Plan

  /** Microsoft Entra ID authentication */
  /**
   * In this sample you can populate the three AZURE_CLIENT_ID, AZURE_CLIENT_SECRET & AZURE_TENANT_ID variables for Microsoft Entra ID auth
   */
  const credential = new DefaultAzureCredential();

  const testId = randomUUID(); // ID to be assigned to a test
  const testProfileId = randomUUID(); // ID to be assigned to the test profile
  const displayName = "Sample Load Test";
  const description = "Sample Test Description";

  const testProfileDisplayName = "Sample Test Profile";
  const testProfileDescription = "Sample Test Profile Description";

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

  // Creating the test profile
  await client.path("/test-profiles/{testProfileId}", testProfileId).patch({
    contentType: "application/merge-patch+json",
    body: {
      displayName: testProfileDisplayName,
      description: testProfileDescription,
      testId: testId,
      targetResourceId: functionsResourceId,
      targetResourceConfigurations: {
        kind: "FunctionsFlexConsumption",
        configurations: {
          config1: {
            instanceMemoryMB: 2048,
            httpConcurrency: 20,
          },
          config2: {
            instanceMemoryMB: 4096,
            httpConcurrency: 100,
          },
        },
      },
    },
  });
}

main().catch(console.error);
