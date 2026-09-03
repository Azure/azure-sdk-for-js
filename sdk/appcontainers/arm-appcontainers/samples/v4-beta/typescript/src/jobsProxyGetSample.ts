// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ContainerAppsAPIClient } from "@azure/arm-appcontainers";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get the properties of a Container App Job.
 *
 * @summary get the properties of a Container App Job.
 * x-ms-original-file: 2025-10-02-preview/Job_ProxyGet.json
 */
async function getContainerAppJobByName(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const client = new ContainerAppsAPIClient(credential, subscriptionId);
  const result = await client.jobs.proxyGet("rg", "testcontainerAppsJob0", "rootApi");
  console.log(result);
}

async function main(): Promise<void> {
  await getContainerAppJobByName();
}

main().catch(console.error);
