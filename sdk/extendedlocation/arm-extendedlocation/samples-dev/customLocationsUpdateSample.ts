// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Updates a Custom Location with the specified Resource Name in the specified Resource Group and Subscription.
 *
 * @summary Updates a Custom Location with the specified Resource Name in the specified Resource Group and Subscription.
 * x-ms-original-file: specification/extendedlocation/resource-manager/Microsoft.ExtendedLocation/preview/2021-08-31-preview/examples/CustomLocationsPatch.json
 */

import type { CustomLocationsUpdateOptionalParams } from "@azure/arm-extendedlocation";
import { CustomLocationsManagementClient } from "@azure/arm-extendedlocation";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function updateCustomLocation(): Promise<void> {
  const subscriptionId =
    process.env["EXTENDEDLOCATION_SUBSCRIPTION_ID"] || "11111111-2222-3333-4444-555555555555";
  const resourceGroupName = process.env["EXTENDEDLOCATION_RESOURCE_GROUP"] || "testresourcegroup";
  const resourceName = "customLocation01";
  const identity = { type: "SystemAssigned" };
  const tags = { archv3: "", tier: "testing" };
  const options: CustomLocationsUpdateOptionalParams = { identity, tags };
  const credential = new DefaultAzureCredential();
  const client = new CustomLocationsManagementClient(credential, subscriptionId);
  const result = await client.customLocations.update(resourceGroupName, resourceName, options);
  console.log(result);
}

async function main(): Promise<void> {
  await updateCustomLocation();
}

main().catch(console.error);
