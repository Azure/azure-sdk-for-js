// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ManagedNetworkFabricClient } from "@azure/arm-managednetworkfabric";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to update BGP state for internalNetwork. Allowed only on edge devices.
 *
 * @summary update BGP state for internalNetwork. Allowed only on edge devices.
 * x-ms-original-file: 2024-06-15-preview/InternalNetworks_UpdateBgpAdministrativeState.json
 */
async function internalNetworksUpdateBgpAdministrativeStateMaximumSetGen(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "0000ABCD-0A0B-0000-0000-000000ABCDEF";
  const client = new ManagedNetworkFabricClient(credential, subscriptionId);
  const result = await client.internalNetworks.updateBgpAdministrativeState(
    "example-rg",
    "example-l3isd",
    "example-internalnetwork",
    { neighborAddress: "10.10.10.10", administrativeState: "Enable" },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await internalNetworksUpdateBgpAdministrativeStateMaximumSetGen();
}

main().catch(console.error);
