// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureSphereClient } from "@azure/arm-sphere";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to create a Device. Use '.unassigned' or '.default' for the device group and product names to claim a device to the catalog only.
 *
 * @summary create a Device. Use '.unassigned' or '.default' for the device group and product names to claim a device to the catalog only.
 * x-ms-original-file: 2024-04-01/PutDevice.json
 */
async function devicesCreateOrUpdate(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new AzureSphereClient(credential, subscriptionId);
  const result = await client.devices.createOrUpdate(
    "MyResourceGroup1",
    "MyCatalog1",
    "MyProduct1",
    "myDeviceGroup1",
    "00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000",
    {},
  );
  console.log(result);
}

async function main(): Promise<void> {
  await devicesCreateOrUpdate();
}

main().catch(console.error);
