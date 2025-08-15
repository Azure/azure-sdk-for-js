// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  RegionConfigurationRequest,
  DataBoxManagementClient,
} from "@azure/arm-databox";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to This API provides configuration details specific to given region/location at Subscription level.
 *
 * @summary This API provides configuration details specific to given region/location at Subscription level.
 * x-ms-original-file: specification/databox/resource-manager/Microsoft.DataBox/stable/2025-02-01/examples/RegionConfiguration.json
 */
async function regionConfiguration(): Promise<void> {
  const subscriptionId =
    process.env["DATABOX_SUBSCRIPTION_ID"] || "YourSubscriptionId";
  const location = "westus";
  const regionConfigurationRequest: RegionConfigurationRequest = {
    deviceCapabilityRequest: { model: "DataBoxDisk", skuName: "DataBoxDisk" },
    scheduleAvailabilityRequest: {
      model: "DataBox",
      skuName: "DataBox",
      storageLocation: "westus",
    },
  };
  const credential = new DefaultAzureCredential();
  const client = new DataBoxManagementClient(credential, subscriptionId);
  const result = await client.service.regionConfiguration(
    location,
    regionConfigurationRequest,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await regionConfiguration();
}

main().catch(console.error);
