// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SqlClient } from "@azure/arm-sql";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets a managed instance.
 *
 * @summary gets a managed instance.
 * x-ms-original-file: 2025-02-01-preview/ManagedInstanceGet.json
 */
async function getManagedInstance(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlClient(credential, subscriptionId);
  const result = await client.managedInstances.get("testrg", "testinstance");
  console.log(result);
}

/**
 * This sample demonstrates how to gets a managed instance.
 *
 * @summary gets a managed instance.
 * x-ms-original-file: 2025-02-01-preview/ManagedInstanceGetWhileUpdating.json
 */
async function getManagedInstanceWhileResourceIsUpdating(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlClient(credential, subscriptionId);
  const result = await client.managedInstances.get("testrg", "testinstance");
  console.log(result);
}

/**
 * This sample demonstrates how to gets a managed instance.
 *
 * @summary gets a managed instance.
 * x-ms-original-file: 2025-02-01-preview/ManagedInstanceGetWithExpandEqualsAdministrators.json
 */
async function getManagedInstanceWithExpandAdministratorsOrActivedirectory(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlClient(credential, subscriptionId);
  const result = await client.managedInstances.get("testrg", "testinstance");
  console.log(result);
}

async function main(): Promise<void> {
  await getManagedInstance();
  await getManagedInstanceWhileResourceIsUpdating();
  await getManagedInstanceWithExpandAdministratorsOrActivedirectory();
}

main().catch(console.error);
