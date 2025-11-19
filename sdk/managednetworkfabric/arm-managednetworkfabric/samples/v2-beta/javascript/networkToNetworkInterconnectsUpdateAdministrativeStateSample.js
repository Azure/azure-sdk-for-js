// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ManagedNetworkFabricClient } = require("@azure/arm-managednetworkfabric");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to updates the Admin State.
 *
 * @summary updates the Admin State.
 * x-ms-original-file: 2024-06-15-preview/NetworkToNetworkInterconnects_UpdateAdministrativeState.json
 */
async function networkToNetworkInterconnectsUpdateAdministrativeStateMaximumSetGen() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "0000ABCD-0A0B-0000-0000-000000ABCDEF";
  const client = new ManagedNetworkFabricClient(credential, subscriptionId);
  const result = await client.networkToNetworkInterconnects.updateAdministrativeState(
    "example-rg",
    "example-nf",
    "example-nni",
    { resourceIds: [""], state: "Enable" },
  );
  console.log(result);
}

async function main() {
  await networkToNetworkInterconnectsUpdateAdministrativeStateMaximumSetGen();
}

main().catch(console.error);
