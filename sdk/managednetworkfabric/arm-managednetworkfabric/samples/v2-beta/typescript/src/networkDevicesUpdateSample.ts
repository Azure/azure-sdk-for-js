// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ManagedNetworkFabricClient } from "@azure/arm-managednetworkfabric";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to update certain properties of the Network Device resource.
 *
 * @summary update certain properties of the Network Device resource.
 * x-ms-original-file: 2024-06-15-preview/NetworkDevices_Update.json
 */
async function networkDevicesUpdateMaximumSetGen(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "0000ABCD-0A0B-0000-0000-000000ABCDEF";
  const client = new ManagedNetworkFabricClient(credential, subscriptionId);
  const result = await client.networkDevices.update("example-rg", "example-device", {
    tags: { KeyId: "KeyValue" },
    properties: {
      annotation: "annotation",
      hostName: "NFA-Device",
      serialNumber: "Vendor;DCS-7280XXX-24;12.05;JPE2111XXXX",
    },
  });
  console.log(result);
}

async function main(): Promise<void> {
  await networkDevicesUpdateMaximumSetGen();
}

main().catch(console.error);
