// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureNetworkFabricManagementServiceAPI } from "@azure/arm-managednetworkfabric";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to executes update operation to enable or disable administrative State for externalNetwork.
 *
 * @summary executes update operation to enable or disable administrative State for externalNetwork.
 * x-ms-original-file: 2025-07-15/ExternalNetworks_UpdateAdministrativeState.json
 */
async function externalNetworksUpdateAdministrativeStateMaximumSetGen(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "0000ABCD-0A0B-0000-0000-000000ABCDEF";
  const client = new AzureNetworkFabricManagementServiceAPI(credential, subscriptionId);
  const result = await client.externalNetworks.updateAdministrativeState(
    "example-rg",
    "example-externalnetwork",
    "example-ext",
    { resourceIds: [""], state: "Enable" },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await externalNetworksUpdateAdministrativeStateMaximumSetGen();
}

main().catch(console.error);
