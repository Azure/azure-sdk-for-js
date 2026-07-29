// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ContainerAppsAPIClient } from "@azure/arm-appcontainers";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to checks if resource name is available.
 *
 * @summary checks if resource name is available.
 * x-ms-original-file: 2025-10-02-preview/ManagedEnvironments_GetAuthToken.json
 */
async function getManagedEnvironmentAuthToken(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "651f8027-33e8-4ec4-97b4-f6e9f3dc8744";
  const client = new ContainerAppsAPIClient(credential, subscriptionId);
  const result = await client.managedEnvironments.getAuthToken("rg", "testenv");
  console.log(result);
}

async function main(): Promise<void> {
  await getManagedEnvironmentAuthToken();
}

main().catch(console.error);
