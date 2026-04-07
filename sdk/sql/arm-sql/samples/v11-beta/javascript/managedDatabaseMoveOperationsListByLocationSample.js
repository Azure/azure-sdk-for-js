// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SqlClient } = require("@azure/arm-sql");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to lists managed database move operations.
 *
 * @summary lists managed database move operations.
 * x-ms-original-file: 2025-02-01-preview/ManagedDatabaseMoveOperationResultList.json
 */
async function getsAllManagedDatabaseMoveOperationsForSpecifiedSubscriptionResourceGroupAndLocation() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.managedDatabaseMoveOperations.listByLocation(
    "rg1",
    "westeurope",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

/**
 * This sample demonstrates how to lists managed database move operations.
 *
 * @summary lists managed database move operations.
 * x-ms-original-file: 2025-02-01-preview/ManagedDatabaseMoveOperationResultListLastOperations.json
 */
async function getsTheLatestManagedDatabaseMoveOperationsForEachDatabaseUnderSpecifiedSubscriptionResourceGroupAndLocation() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.managedDatabaseMoveOperations.listByLocation(
    "rg1",
    "westeurope",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

/**
 * This sample demonstrates how to lists managed database move operations.
 *
 * @summary lists managed database move operations.
 * x-ms-original-file: 2025-02-01-preview/ManagedDatabaseMoveOperationResultListMax.json
 */
async function getsTheLatestManagedDatabaseMoveOperationsForEachDatabaseUnderSpecifiedSubscriptionResourceGroupAndLocationFilteredByOperationType() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.managedDatabaseMoveOperations.listByLocation(
    "rg1",
    "westeurope",
    { filter: "Properties/Operation eq 'StartManagedInstanceDatabaseMove'" },
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await getsAllManagedDatabaseMoveOperationsForSpecifiedSubscriptionResourceGroupAndLocation();
  await getsTheLatestManagedDatabaseMoveOperationsForEachDatabaseUnderSpecifiedSubscriptionResourceGroupAndLocation();
  await getsTheLatestManagedDatabaseMoveOperationsForEachDatabaseUnderSpecifiedSubscriptionResourceGroupAndLocationFilteredByOperationType();
}

main().catch(console.error);
