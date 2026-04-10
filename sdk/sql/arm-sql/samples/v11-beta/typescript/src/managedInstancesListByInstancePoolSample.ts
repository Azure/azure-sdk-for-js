// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SqlManagementClient } from "@azure/arm-sql";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets a list of all managed instances in an instance pool.
 *
 * @summary gets a list of all managed instances in an instance pool.
 * x-ms-original-file: 2025-02-01-preview/ManagedInstanceListByInstancePool.json
 */
async function listManagedInstancesByInstancePool(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.managedInstances.listByInstancePool("Test1", "pool1")) {
    resArray.push(item);
  }

  console.log(resArray);
}

/**
 * This sample demonstrates how to gets a list of all managed instances in an instance pool.
 *
 * @summary gets a list of all managed instances in an instance pool.
 * x-ms-original-file: 2025-02-01-preview/ManagedInstanceListByInstancePoolWithExpandEqualsAdministrators.json
 */
async function listManagedInstancesByInstancePoolWithExpandAdministratorsOrActivedirectory(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.managedInstances.listByInstancePool("Test1", "pool1")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await listManagedInstancesByInstancePool();
  await listManagedInstancesByInstancePoolWithExpandAdministratorsOrActivedirectory();
}

main().catch(console.error);
