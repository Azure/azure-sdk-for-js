// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ManagedNetworkFabricClient } from "@azure/arm-managednetworkfabric";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to updates the Administrative state of the Network Device.
 *
 * @summary updates the Administrative state of the Network Device.
 * x-ms-original-file: 2024-06-15-preview/NetworkDevices_UpdateAdministrativeState.json
 */
async function networkDevicesUpdateAdministrativeStateMaximumSetGen(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "0000ABCD-0A0B-0000-0000-000000ABCDEF";
  const client = new ManagedNetworkFabricClient(credential, subscriptionId);
  const result = await client.networkDevices.updateAdministrativeState(
    "example-rg",
    "example-device",
    { resourceIds: [""], state: "RMA" },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await networkDevicesUpdateAdministrativeStateMaximumSetGen();
}

main().catch(console.error);
