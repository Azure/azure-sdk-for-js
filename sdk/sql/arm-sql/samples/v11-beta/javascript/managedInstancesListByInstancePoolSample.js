// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SqlManagementClient } = require("@azure/arm-sql");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets a list of all managed instances in an instance pool.
 *
 * @summary gets a list of all managed instances in an instance pool.
 * x-ms-original-file: 2025-02-01-preview/ManagedInstanceListByInstancePool.json
 */
async function listManagedInstancesByInstancePool() {
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
async function listManagedInstancesByInstancePoolWithExpandAdministratorsOrActivedirectory() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.managedInstances.listByInstancePool("Test1", "pool1")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listManagedInstancesByInstancePool();
  await listManagedInstancesByInstancePoolWithExpandAdministratorsOrActivedirectory();
}

main().catch(console.error);
