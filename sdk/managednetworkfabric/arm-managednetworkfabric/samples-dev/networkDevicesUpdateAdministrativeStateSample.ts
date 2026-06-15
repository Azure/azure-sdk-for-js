// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureNetworkFabricManagementServiceAPI } from "@azure/arm-managednetworkfabric";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to updates the Administrative state of the Network Device.
 *
 * @summary updates the Administrative state of the Network Device.
 * x-ms-original-file: 2025-07-15/NetworkDevices_UpdateAdministrativeState.json
 */
async function networkDevicesUpdateAdministrativeStateMaximumSetGen(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "0000ABCD-0A0B-0000-0000-000000ABCDEF";
  const client = new AzureNetworkFabricManagementServiceAPI(credential, subscriptionId);
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
