// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SqlManagementClient } = require("@azure/arm-sql");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Lists managed database move operations.
 *
 * @summary Lists managed database move operations.
 * x-ms-original-file: specification/sql/resource-manager/Microsoft.Sql/preview/2022-05-01-preview/examples/ManagedDatabaseMoveOperationResultList.json
 */
async function getsAllManagedDatabaseMoveOperationsForSpecifiedSubscriptionResourceGroupAndLocation() {
  const subscriptionId =
    process.env["SQL_SUBSCRIPTION_ID"] || "00000000-1111-2222-3333-444444444444";
  const resourceGroupName = process.env["SQL_RESOURCE_GROUP"] || "rg1";
  const locationName = "westeurope";
  const credential = new DefaultAzureCredential();
  const client = new SqlManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.managedDatabaseMoveOperations.listByLocation(
    resourceGroupName,
    locationName,
  )) {
    resArray.push(item);
  }
  console.log(resArray);
}

/**
 * This sample demonstrates how to Lists managed database move operations.
 *
 * @summary Lists managed database move operations.
 * x-ms-original-file: specification/sql/resource-manager/Microsoft.Sql/preview/2022-05-01-preview/examples/ManagedDatabaseMoveOperationResultListMax.json
 */
async function getsTheLatestManagedDatabaseMoveOperationsForEachDatabaseUnderSpecifiedSubscriptionResourceGroupAndLocationFilteredByOperationType() {
  const subscriptionId =
    process.env["SQL_SUBSCRIPTION_ID"] || "00000000-1111-2222-3333-444444444444";
  const resourceGroupName = process.env["SQL_RESOURCE_GROUP"] || "rg1";
  const locationName = "westeurope";
  const filter = "Properties/Operation eq 'StartManagedInstanceDatabaseMove'";
  const options = {
    filter,
  };
  const credential = new DefaultAzureCredential();
  const client = new SqlManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.managedDatabaseMoveOperations.listByLocation(
    resourceGroupName,
    locationName,
    options,
  )) {
    resArray.push(item);
  }
  console.log(resArray);
}

/**
 * This sample demonstrates how to Lists managed database move operations.
 *
 * @summary Lists managed database move operations.
 * x-ms-original-file: specification/sql/resource-manager/Microsoft.Sql/preview/2022-05-01-preview/examples/ManagedDatabaseMoveOperationResultListLastOperations.json
 */
async function getsTheLatestManagedDatabaseMoveOperationsForEachDatabaseUnderSpecifiedSubscriptionResourceGroupAndLocation() {
  const subscriptionId =
    process.env["SQL_SUBSCRIPTION_ID"] || "00000000-1111-2222-3333-444444444444";
  const resourceGroupName = process.env["SQL_RESOURCE_GROUP"] || "rg1";
  const locationName = "westeurope";
  const credential = new DefaultAzureCredential();
  const client = new SqlManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.managedDatabaseMoveOperations.listByLocation(
    resourceGroupName,
    locationName,
  )) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main() {
  await getsAllManagedDatabaseMoveOperationsForSpecifiedSubscriptionResourceGroupAndLocation();
  await getsTheLatestManagedDatabaseMoveOperationsForEachDatabaseUnderSpecifiedSubscriptionResourceGroupAndLocationFilteredByOperationType();
  await getsTheLatestManagedDatabaseMoveOperationsForEachDatabaseUnderSpecifiedSubscriptionResourceGroupAndLocation();
}

main().catch(console.error);
