// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { CustomLocationsManagementClient } = require("@azure/arm-extendedlocation");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to deletes the Resource Sync Rule with the specified Resource Sync Rule Name, Custom Location Resource Name, Resource Group, and Subscription Id.
 *
 * @summary deletes the Resource Sync Rule with the specified Resource Sync Rule Name, Custom Location Resource Name, Resource Group, and Subscription Id.
 * x-ms-original-file: 2021-08-31-preview/ResourceSyncRulesDelete.json
 */
async function deleteResourceSyncRule() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "11111111-2222-3333-4444-555555555555";
  const client = new CustomLocationsManagementClient(credential, subscriptionId);
  await client.resourceSyncRules.delete(
    "testresourcegroup",
    "customLocation01",
    "resourceSyncRule01",
  );
}

async function main() {
  await deleteResourceSyncRule();
}

main().catch(console.error);
