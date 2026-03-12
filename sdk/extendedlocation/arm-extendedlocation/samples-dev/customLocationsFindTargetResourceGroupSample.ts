// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Returns the target resource group associated with the resource sync rules of the Custom Location that match the rules passed in with the Find Target Resource Group Request.
 *
 * @summary Returns the target resource group associated with the resource sync rules of the Custom Location that match the rules passed in with the Find Target Resource Group Request.
 * x-ms-original-file: specification/extendedlocation/resource-manager/Microsoft.ExtendedLocation/preview/2021-08-31-preview/examples/CustomLocationsFindTargetResourceGroup.json
 */

import type { CustomLocationFindTargetResourceGroupProperties } from "@azure/arm-extendedlocation";
import { CustomLocationsManagementClient } from "@azure/arm-extendedlocation";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function postCustomLocationFindTargetResourceGroup(): Promise<void> {
  const subscriptionId =
    process.env["EXTENDEDLOCATION_SUBSCRIPTION_ID"] || "11111111-2222-3333-4444-555555555555";
  const resourceGroupName = process.env["EXTENDEDLOCATION_RESOURCE_GROUP"] || "testresourcegroup";
  const resourceName = "customLocation01";
  const parameters: CustomLocationFindTargetResourceGroupProperties = {
    labels: { key1: "value1", key2: "value2" },
  };
  const credential = new DefaultAzureCredential();
  const client = new CustomLocationsManagementClient(credential, subscriptionId);
  const result = await client.customLocations.findTargetResourceGroup(
    resourceGroupName,
    resourceName,
    parameters,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await postCustomLocationFindTargetResourceGroup();
}

main().catch(console.error);
