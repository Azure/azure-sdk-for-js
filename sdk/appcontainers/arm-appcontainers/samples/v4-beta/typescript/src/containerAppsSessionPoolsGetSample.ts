// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ContainerAppsAPIClient } from "@azure/arm-appcontainers";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get the properties of a session pool.
 *
 * @summary get the properties of a session pool.
 * x-ms-original-file: 2025-10-02-preview/SessionPools_Get.json
 */
async function getSessionPool(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const client = new ContainerAppsAPIClient(credential, subscriptionId);
  const result = await client.containerAppsSessionPools.get("rg", "testsessionpool");
  console.log(result);
}

/**
 * This sample demonstrates how to get the properties of a session pool.
 *
 * @summary get the properties of a session pool.
 * x-ms-original-file: 2025-10-02-preview/SessionPools_Get_InProgress.json
 */
async function getSessionPoolDuringUpdate(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const client = new ContainerAppsAPIClient(credential, subscriptionId);
  const result = await client.containerAppsSessionPools.get("rg", "testsessionpool");
  console.log(result);
}

async function main(): Promise<void> {
  await getSessionPool();
  await getSessionPoolDuringUpdate();
}

main().catch(console.error);
