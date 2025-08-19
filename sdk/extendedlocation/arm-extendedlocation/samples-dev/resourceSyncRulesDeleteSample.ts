// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Deletes the Resource Sync Rule with the specified Resource Sync Rule Name, Custom Location Resource Name, Resource Group, and Subscription Id.
 *
 * @summary Deletes the Resource Sync Rule with the specified Resource Sync Rule Name, Custom Location Resource Name, Resource Group, and Subscription Id.
 * x-ms-original-file: specification/extendedlocation/resource-manager/Microsoft.ExtendedLocation/preview/2021-08-31-preview/examples/ResourceSyncRulesDelete.json
 */

import { CustomLocationsManagementClient } from "@azure/arm-extendedlocation";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function deleteResourceSyncRule(): Promise<void> {
  const subscriptionId =
    process.env["EXTENDEDLOCATION_SUBSCRIPTION_ID"] || "11111111-2222-3333-4444-555555555555";
  const resourceGroupName = process.env["EXTENDEDLOCATION_RESOURCE_GROUP"] || "testresourcegroup";
  const resourceName = "customLocation01";
  const childResourceName = "resourceSyncRule01";
  const credential = new DefaultAzureCredential();
  const client = new CustomLocationsManagementClient(credential, subscriptionId);
  const result = await client.resourceSyncRules.delete(
    resourceGroupName,
    resourceName,
    childResourceName,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await deleteResourceSyncRule();
}

main().catch(console.error);
