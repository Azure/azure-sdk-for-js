// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ManagedNetworkFabricClient } = require("@azure/arm-managednetworkfabric");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to update Administrative state of  InternalNetworks on resources referred by their resource ids.
 *
 * @summary update Administrative state of  InternalNetworks on resources referred by their resource ids.
 * x-ms-original-file: 2024-06-15-preview/InternalNetworks_UpdateAdministrativeState.json
 */
async function internalNetworksUpdateAdministrativeStateMaximumSetGen() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "0000ABCD-0A0B-0000-0000-000000ABCDEF";
  const client = new ManagedNetworkFabricClient(credential, subscriptionId);
  const result = await client.internalNetworks.updateAdministrativeState(
    "example-rg",
    "example-l3isd",
    "example-internalnetwork",
    { resourceIds: [""], state: "Enable" },
  );
  console.log(result);
}

async function main() {
  await internalNetworksUpdateAdministrativeStateMaximumSetGen();
}

main().catch(console.error);
