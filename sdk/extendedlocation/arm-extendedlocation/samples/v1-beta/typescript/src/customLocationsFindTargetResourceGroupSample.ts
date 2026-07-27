// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CustomLocationsManagementClient } from "@azure/arm-extendedlocation";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to returns the target resource group associated with the resource sync rules of the Custom Location that match the rules passed in with the Find Target Resource Group Request.
 *
 * @summary returns the target resource group associated with the resource sync rules of the Custom Location that match the rules passed in with the Find Target Resource Group Request.
 * x-ms-original-file: 2021-08-31-preview/CustomLocationsFindTargetResourceGroup.json
 */
async function postCustomLocationFindTargetResourceGroup(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "11111111-2222-3333-4444-555555555555";
  const client = new CustomLocationsManagementClient(credential, subscriptionId);
  const result = await client.customLocations.findTargetResourceGroup(
    "testresourcegroup",
    "customLocation01",
    { labels: { key1: "value1", key2: "value2" } },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await postCustomLocationFindTargetResourceGroup();
}

main().catch(console.error);
