// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { WebSiteManagementClient } from "@azure/arm-appservice";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to description for Create or update a worker pool.
 *
 * @summary description for Create or update a worker pool.
 * x-ms-original-file: 2025-05-01/AppServiceEnvironments_CreateOrUpdateWorkerPool_CreateOrUpdateWorkerPool.json
 */
async function getPropertiesOfAWorkerPool(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const client = new WebSiteManagementClient(credential, subscriptionId);
  const result = await client.appServiceEnvironments.createOrUpdateWorkerPool(
    "test-rg",
    "test-ase",
    "0",
    { workerCount: 3, workerSize: "Small" },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await getPropertiesOfAWorkerPool();
}

main().catch(console.error);
