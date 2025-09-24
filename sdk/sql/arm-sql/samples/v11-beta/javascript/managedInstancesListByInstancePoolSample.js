// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SqlManagementClient } = require("@azure/arm-sql");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Gets a list of all managed instances in an instance pool.
 *
 * @summary Gets a list of all managed instances in an instance pool.
 * x-ms-original-file: specification/sql/resource-manager/Microsoft.Sql/preview/2023-05-01-preview/examples/ManagedInstanceListByInstancePool.json
 */
async function listManagedInstancesByInstancePool() {
  const subscriptionId =
    process.env["SQL_SUBSCRIPTION_ID"] || "00000000-1111-2222-3333-444444444444";
  const resourceGroupName = process.env["SQL_RESOURCE_GROUP"] || "Test1";
  const instancePoolName = "pool1";
  const credential = new DefaultAzureCredential();
  const client = new SqlManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.managedInstances.listByInstancePool(
    resourceGroupName,
    instancePoolName,
  )) {
    resArray.push(item);
  }
  console.log(resArray);
}

/**
 * This sample demonstrates how to Gets a list of all managed instances in an instance pool.
 *
 * @summary Gets a list of all managed instances in an instance pool.
 * x-ms-original-file: specification/sql/resource-manager/Microsoft.Sql/preview/2023-05-01-preview/examples/ManagedInstanceListByInstancePoolWithExpandEqualsAdministrators.json
 */
async function listManagedInstancesByInstancePoolWithExpandAdministratorsOrActivedirectory() {
  const subscriptionId =
    process.env["SQL_SUBSCRIPTION_ID"] || "00000000-1111-2222-3333-444444444444";
  const resourceGroupName = process.env["SQL_RESOURCE_GROUP"] || "Test1";
  const instancePoolName = "pool1";
  const credential = new DefaultAzureCredential();
  const client = new SqlManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.managedInstances.listByInstancePool(
    resourceGroupName,
    instancePoolName,
  )) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main() {
  await listManagedInstancesByInstancePool();
  await listManagedInstancesByInstancePoolWithExpandAdministratorsOrActivedirectory();
}

main().catch(console.error);
