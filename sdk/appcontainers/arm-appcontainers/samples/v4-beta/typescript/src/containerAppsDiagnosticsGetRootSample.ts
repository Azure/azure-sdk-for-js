// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ContainerAppsAPIClient } from "@azure/arm-appcontainers";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get the properties of a Container App.
 *
 * @summary get the properties of a Container App.
 * x-ms-original-file: 2025-10-02-preview/ContainerApps_Get1.json
 */
async function getContainerApp(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const client = new ContainerAppsAPIClient(credential, subscriptionId);
  const result = await client.containerAppsDiagnostics.getRoot("rg", "testcontainerApp0");
  console.log(result);
}

async function main(): Promise<void> {
  await getContainerApp();
}

main().catch(console.error);
