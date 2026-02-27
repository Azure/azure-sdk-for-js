// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { WebSiteManagementClient } from "@azure/arm-appservice";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to description for Create or update a multi-role pool.
 *
 * @summary description for Create or update a multi-role pool.
 * x-ms-original-file: 2025-05-01/AppServiceEnvironments_CreateOrUpdateMultiRolePool.json
 */
async function createOrUpdateAMultiRolePool(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const client = new WebSiteManagementClient(credential, subscriptionId);
  const result = await client.appServiceEnvironments.createOrUpdateMultiRolePool(
    "test-rg",
    "test-ase",
    { workerCount: 3, workerSize: "Medium" },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await createOrUpdateAMultiRolePool();
}

main().catch(console.error);
