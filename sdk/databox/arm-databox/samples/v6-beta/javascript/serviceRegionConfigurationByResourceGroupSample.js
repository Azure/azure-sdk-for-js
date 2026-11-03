// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DataBoxManagementClient } = require("@azure/arm-databox");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to this API provides configuration details specific to given region/location at Resource group level.
 *
 * @summary this API provides configuration details specific to given region/location at Resource group level.
 * x-ms-original-file: 2025-07-01/RegionConfigurationByResourceGroup.json
 */
async function regionConfigurationByResourceGroup() {
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

async function main() {
  await regionConfigurationByResourceGroup();
}

main().catch(console.error);
