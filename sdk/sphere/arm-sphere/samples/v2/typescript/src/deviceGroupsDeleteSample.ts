// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureSphereClient } from "@azure/arm-sphere";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to delete a DeviceGroup. '.default' and '.unassigned' are system defined values and cannot be used for product or device group name.
 *
 * @summary delete a DeviceGroup. '.default' and '.unassigned' are system defined values and cannot be used for product or device group name.
 * x-ms-original-file: 2024-04-01/DeleteDeviceGroup.json
 */
async function deviceGroupsDelete(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new AzureSphereClient(credential, subscriptionId);
  await client.deviceGroups.delete(
    "MyResourceGroup1",
    "MyCatalog1",
    "MyProduct1",
    "MyDeviceGroup1",
  );
}

async function main(): Promise<void> {
  await deviceGroupsDelete();
}

main().catch(console.error);
