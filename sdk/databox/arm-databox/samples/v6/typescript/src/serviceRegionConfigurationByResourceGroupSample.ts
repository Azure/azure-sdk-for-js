// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DataBoxManagementClient } from "@azure/arm-databox";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to this API provides configuration details specific to given region/location at Resource group level.
 *
 * @summary this API provides configuration details specific to given region/location at Resource group level.
 * x-ms-original-file: 2025-07-01/RegionConfigurationByResourceGroup.json
 */
async function regionConfigurationByResourceGroup(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "YourSubscriptionId";
  const client = new DataBoxManagementClient(credential, subscriptionId);
  const result = await client.service.regionConfigurationByResourceGroup(
    "YourResourceGroupName",
    "westus",
    {
      deviceCapabilityRequest: { model: "DataBoxDisk", skuName: "DataBoxDisk" },
      scheduleAvailabilityRequest: {
        model: "DataBox",
        skuName: "DataBox",
        storageLocation: "westus",
      },
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await regionConfigurationByResourceGroup();
}

main().catch(console.error);
