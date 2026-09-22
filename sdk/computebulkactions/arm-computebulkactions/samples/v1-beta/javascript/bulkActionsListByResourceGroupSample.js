// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ComputeBulkActionsClient } = require("@azure/arm-computebulkactions");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list LaunchBulkInstancesOperation resources by resource group.
 *
 * @summary list LaunchBulkInstancesOperation resources by resource group.
 * x-ms-original-file: 2026-02-01-preview/BulkActions_ListByResourceGroup_MaximumSet_Gen.json
 */
async function bulkActionsListByResourceGroupGeneratedByMaximumSetRule() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "50352BBD-59F1-4EE2-BA9C-A6E51B0B1B2B";
  const client = new ComputeBulkActionsClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.bulkActions.listByResourceGroup(
    "rgcomputebulkactions",
    "eastus2euap",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

/**
 * This sample demonstrates how to list LaunchBulkInstancesOperation resources by resource group.
 *
 * @summary list LaunchBulkInstancesOperation resources by resource group.
 * x-ms-original-file: 2026-02-01-preview/BulkActions_ListByResourceGroup_MinimumSet_Gen.json
 */
async function bulkActionsListByResourceGroupGeneratedByMinimumSetRule() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "50352BBD-59F1-4EE2-BA9C-A6E51B0B1B2B";
  const client = new ComputeBulkActionsClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.bulkActions.listByResourceGroup(
    "rgcomputebulkactions",
    "eastus2euap",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await bulkActionsListByResourceGroupGeneratedByMaximumSetRule();
  await bulkActionsListByResourceGroupGeneratedByMinimumSetRule();
}

main().catch(console.error);
