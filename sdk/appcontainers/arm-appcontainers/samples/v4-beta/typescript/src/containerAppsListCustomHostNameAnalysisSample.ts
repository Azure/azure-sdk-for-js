// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ContainerAppsAPIClient } from "@azure/arm-appcontainers";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to analyzes a custom hostname for a Container App
 *
 * @summary analyzes a custom hostname for a Container App
 * x-ms-original-file: 2025-10-02-preview/ContainerApps_ListCustomHostNameAnalysis.json
 */
async function analyzeCustomHostname(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const client = new ContainerAppsAPIClient(credential, subscriptionId);
  const result = await client.containerApps.listCustomHostNameAnalysis("rg", "testcontainerApp0", {
    customHostname: "my.name.corp",
  });
  console.log(result);
}

async function main(): Promise<void> {
  await analyzeCustomHostname();
}

main().catch(console.error);
