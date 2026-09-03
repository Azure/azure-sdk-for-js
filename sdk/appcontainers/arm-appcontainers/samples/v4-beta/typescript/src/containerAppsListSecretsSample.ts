// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ContainerAppsAPIClient } from "@azure/arm-appcontainers";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to list secrets for a container app
 *
 * @summary list secrets for a container app
 * x-ms-original-file: 2025-10-02-preview/ContainerApps_ListSecrets.json
 */
async function listContainerAppsSecrets(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const client = new ContainerAppsAPIClient(credential, subscriptionId);
  const result = await client.containerApps.listSecrets("rg", "testcontainerApp0");
  console.log(result);
}

async function main(): Promise<void> {
  await listContainerAppsSecrets();
}

main().catch(console.error);
