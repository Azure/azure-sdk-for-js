// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SqlClient } from "@azure/arm-sql";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets a list of all managed instances in the subscription.
 *
 * @summary gets a list of all managed instances in the subscription.
 * x-ms-original-file: 2025-02-01-preview/ManagedInstanceList.json
 */
async function listManagedInstances(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.managedInstances.list()) {
    resArray.push(item);
  }

  console.log(resArray);
}

/**
 * This sample demonstrates how to gets a list of all managed instances in the subscription.
 *
 * @summary gets a list of all managed instances in the subscription.
 * x-ms-original-file: 2025-02-01-preview/ManagedInstanceListWithExpandEqualsAdministrators.json
 */
async function listManagedInstancesWithExpandAdministratorsOrActivedirectory(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.managedInstances.list()) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await listManagedInstances();
  await listManagedInstancesWithExpandAdministratorsOrActivedirectory();
}

main().catch(console.error);
