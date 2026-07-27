// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureNetworkFabricManagementServiceAPI } from "@azure/arm-managednetworkfabric";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to run the RW Command on the Network Device.
 *
 * @summary run the RW Command on the Network Device.
 * x-ms-original-file: 2025-07-15/NetworkDevices_RunRwCommand.json
 */
async function networkDevicesRunRwCommandMaximumSetGen(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "0000ABCD-0A0B-0000-0000-000000ABCDEF";
  const client = new AzureNetworkFabricManagementServiceAPI(credential, subscriptionId);
  const result = await client.networkDevices.runRwCommand("example-rg", "example-device", {
    command: "show running-config",
    commandUrl: "https://example.blob.core.windows.net/commands/config.txt",
  });
  console.log(result);
}

async function main(): Promise<void> {
  await networkDevicesRunRwCommandMaximumSetGen();
}

main().catch(console.error);
