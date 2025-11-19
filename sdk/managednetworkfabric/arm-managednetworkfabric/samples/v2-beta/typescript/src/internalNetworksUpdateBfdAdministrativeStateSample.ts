// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ManagedNetworkFabricClient } from "@azure/arm-managednetworkfabric";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to bFD administrative state for either static or bgp for internalNetwork.
 *
 * @summary bFD administrative state for either static or bgp for internalNetwork.
 * x-ms-original-file: 2024-06-15-preview/InternalNetworks_UpdateBfdAdministrativeState.json
 */
async function internalNetworksUpdateBfdAdministrativeState(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "0000ABCD-0A0B-0000-0000-000000ABCDEF";
  const client = new ManagedNetworkFabricClient(credential, subscriptionId);
  const result = await client.internalNetworks.updateBfdAdministrativeState(
    "example-rg",
    "example-l3isd",
    "example-internalnetwork",
    {
      routeType: "Static",
      neighborAddress: "10.10.1.10",
      administrativeState: "Enable",
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await internalNetworksUpdateBfdAdministrativeState();
}

main().catch(console.error);
