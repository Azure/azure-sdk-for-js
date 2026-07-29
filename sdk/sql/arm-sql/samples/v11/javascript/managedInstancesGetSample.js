// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SqlManagementClient } = require("@azure/arm-sql");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets a managed instance.
 *
 * @summary gets a managed instance.
 * x-ms-original-file: 2025-01-01/ManagedInstanceGet.json
 */
async function getManagedInstance() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlManagementClient(credential, subscriptionId);
  const result = await client.managedInstances.get("testrg", "testinstance");
  console.log(result);
}

/**
 * This sample demonstrates how to gets a managed instance.
 *
 * @summary gets a managed instance.
 * x-ms-original-file: 2025-01-01/ManagedInstanceGetWhileUpdating.json
 */
async function getManagedInstanceWhileResourceIsUpdating() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlManagementClient(credential, subscriptionId);
  const result = await client.managedInstances.get("testrg", "testinstance");
  console.log(result);
}

/**
 * This sample demonstrates how to gets a managed instance.
 *
 * @summary gets a managed instance.
 * x-ms-original-file: 2025-01-01/ManagedInstanceGetWithExpandEqualsAdministrators.json
 */
async function getManagedInstanceWithExpandAdministratorsOrActivedirectory() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlManagementClient(credential, subscriptionId);
  const result = await client.managedInstances.get("testrg", "testinstance");
  console.log(result);
}

async function main() {
  await getManagedInstance();
  await getManagedInstanceWhileResourceIsUpdating();
  await getManagedInstanceWithExpandAdministratorsOrActivedirectory();
}

main().catch(console.error);
