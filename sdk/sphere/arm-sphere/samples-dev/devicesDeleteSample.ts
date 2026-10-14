// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureSphereClient } from "@azure/arm-sphere";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to delete a Device
 *
 * @summary delete a Device
 * x-ms-original-file: 2024-04-01/DeleteDevice.json
 */
async function devicesDelete(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new AzureSphereClient(credential, subscriptionId);
  await client.devices.delete(
    "MyResourceGroup1",
    "MyCatalog1",
    "MyProductName1",
    "DeviceGroupName1",
    "00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000",
  );
}

async function main(): Promise<void> {
  await devicesDelete();
}

main().catch(console.error);
