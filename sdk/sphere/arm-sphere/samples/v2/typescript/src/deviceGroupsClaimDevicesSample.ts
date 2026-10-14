// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureSphereClient } from "@azure/arm-sphere";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to bulk claims the devices. Use '.unassigned' or '.default' for the device group and product names when bulk claiming devices to a catalog only.
 *
 * @summary bulk claims the devices. Use '.unassigned' or '.default' for the device group and product names when bulk claiming devices to a catalog only.
 * x-ms-original-file: 2024-04-01/PostClaimDevices.json
 */
async function deviceGroupsClaimDevices(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new AzureSphereClient(credential, subscriptionId);
  await client.deviceGroups.claimDevices(
    "MyResourceGroup1",
    "MyCatalog1",
    "MyProduct1",
    "MyDeviceGroup1",
    {
      deviceIdentifiers: [
        "00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000",
      ],
    },
  );
}

async function main(): Promise<void> {
  await deviceGroupsClaimDevices();
}

main().catch(console.error);
