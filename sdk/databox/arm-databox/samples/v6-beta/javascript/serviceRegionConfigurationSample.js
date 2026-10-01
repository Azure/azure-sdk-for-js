// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DataBoxManagementClient } = require("@azure/arm-databox");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to this API provides configuration details specific to given region/location at Subscription level.
 *
 * @summary this API provides configuration details specific to given region/location at Subscription level.
 * x-ms-original-file: 2025-07-01/RegionConfiguration.json
 */
async function regionConfiguration() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "YourSubscriptionId";
  const client = new DataBoxManagementClient(credential, subscriptionId);
  const result = await client.service.regionConfiguration("westus", {
    deviceCapabilityRequest: { model: "DataBoxDisk", skuName: "DataBoxDisk" },
    scheduleAvailabilityRequest: {
      model: "DataBox",
      skuName: "DataBox",
      storageLocation: "westus",
    },
  });
  console.log(result);
}

async function main() {
  await regionConfiguration();
}

main().catch(console.error);
