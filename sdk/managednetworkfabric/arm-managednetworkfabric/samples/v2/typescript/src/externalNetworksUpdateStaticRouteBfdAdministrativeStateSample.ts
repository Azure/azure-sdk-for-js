// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureNetworkFabricManagementServiceAPI } from "@azure/arm-managednetworkfabric";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to update Static Route BFD for external Network.
 *
 * @summary update Static Route BFD for external Network.
 * x-ms-original-file: 2025-07-15/ExternalNetworks_UpdateStaticRouteBfdAdministrativeState.json
 */
async function externalNetworksUpdateStaticRouteBfdAdministrativeState(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "1234ABCD-0A1B-1234-5678-123456ABCDEF";
  const client = new AzureNetworkFabricManagementServiceAPI(credential, subscriptionId);
  const result = await client.externalNetworks.updateStaticRouteBfdAdministrativeState(
    "example-rg",
    "example-l3domain",
    "example-externalnetwork",
    { state: "Enable", resourceIds: [""] },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await externalNetworksUpdateStaticRouteBfdAdministrativeState();
}

main().catch(console.error);
