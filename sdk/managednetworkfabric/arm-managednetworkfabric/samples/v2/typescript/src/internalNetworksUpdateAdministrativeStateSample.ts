// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureNetworkFabricManagementServiceAPI } from "@azure/arm-managednetworkfabric";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to executes update operation to enable or disable administrative State for InternalNetwork.
 *
 * @summary executes update operation to enable or disable administrative State for InternalNetwork.
 * x-ms-original-file: 2025-07-15/InternalNetworks_UpdateAdministrativeState.json
 */
async function internalNetworksUpdateAdministrativeStateMaximumSetGen(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "0000ABCD-0A0B-0000-0000-000000ABCDEF";
  const client = new AzureNetworkFabricManagementServiceAPI(credential, subscriptionId);
  const result = await client.internalNetworks.updateAdministrativeState(
    "example-rg",
    "example-l3isd",
    "example-internalnetwork",
    { resourceIds: [""], state: "Enable" },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await internalNetworksUpdateAdministrativeStateMaximumSetGen();
}

main().catch(console.error);
