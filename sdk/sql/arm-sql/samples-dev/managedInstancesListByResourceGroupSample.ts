// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SqlClient } from "@azure/arm-sql";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets a list of managed instances in a resource group.
 *
 * @summary gets a list of managed instances in a resource group.
 * x-ms-original-file: 2025-02-01-preview/ManagedInstanceListByResourceGroup.json
 */
async function listManagedInstancesByResourceGroup(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.managedInstances.listByResourceGroup("Test1")) {
    resArray.push(item);
  }

  console.log(resArray);
}

/**
 * This sample demonstrates how to gets a list of managed instances in a resource group.
 *
 * @summary gets a list of managed instances in a resource group.
 * x-ms-original-file: 2025-02-01-preview/ManagedInstanceListByResourceGroupWithExpandEqualsAdministrators.json
 */
async function listManagedInstancesByResourceGroupWithExpandAdministratorsOrActivedirectory(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.managedInstances.listByResourceGroup("Test1")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await listManagedInstancesByResourceGroup();
  await listManagedInstancesByResourceGroupWithExpandAdministratorsOrActivedirectory();
}

main().catch(console.error);
