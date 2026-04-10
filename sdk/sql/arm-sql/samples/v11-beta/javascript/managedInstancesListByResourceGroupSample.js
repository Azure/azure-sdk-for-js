// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SqlManagementClient } = require("@azure/arm-sql");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets a list of managed instances in a resource group.
 *
 * @summary gets a list of managed instances in a resource group.
 * x-ms-original-file: 2025-02-01-preview/ManagedInstanceListByResourceGroup.json
 */
async function listManagedInstancesByResourceGroup() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlManagementClient(credential, subscriptionId);
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
async function listManagedInstancesByResourceGroupWithExpandAdministratorsOrActivedirectory() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.managedInstances.listByResourceGroup("Test1")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listManagedInstancesByResourceGroup();
  await listManagedInstancesByResourceGroupWithExpandAdministratorsOrActivedirectory();
}

main().catch(console.error);
