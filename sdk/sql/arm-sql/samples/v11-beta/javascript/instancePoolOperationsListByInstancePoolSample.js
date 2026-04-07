// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SqlClient } = require("@azure/arm-sql");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets a list of operations performed on the instance pool.
 *
 * @summary gets a list of operations performed on the instance pool.
 * x-ms-original-file: 2025-02-01-preview/ListInstancePoolOperations.json
 */
async function listTheInstancePoolManagementOperationsWithSomeResults() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.instancePoolOperations.listByInstancePool(
    "resource-group",
    "test-instance-pool",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

/**
 * This sample demonstrates how to gets a list of operations performed on the instance pool.
 *
 * @summary gets a list of operations performed on the instance pool.
 * x-ms-original-file: 2025-02-01-preview/ListInstancePoolOperationsEmpty.json
 */
async function listTheInstancePoolManagementOperationsWithNoResults() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.instancePoolOperations.listByInstancePool(
    "resource-group",
    "test-instance-pool",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listTheInstancePoolManagementOperationsWithSomeResults();
  await listTheInstancePoolManagementOperationsWithNoResults();
}

main().catch(console.error);
