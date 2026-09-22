// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureNetworkFabricManagementServiceAPI } = require("@azure/arm-managednetworkfabric");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to updates the Admin State.
 *
 * @summary updates the Admin State.
 * x-ms-original-file: 2025-07-15/NetworkToNetworkInterconnects_UpdateBfdAdministrativeState.json
 */
async function networkToNetworkInterconnectsUpdateBfdAdministrativeState() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "0000ABCD-0A0B-0000-0000-000000ABCDEF";
  const client = new AzureNetworkFabricManagementServiceAPI(credential, subscriptionId);
  const result = await client.networkToNetworkInterconnects.updateBfdAdministrativeState(
    "example-rg",
    "example-nf",
    "example-nni",
    { routeType: "Static", administrativeState: "Enable" },
  );
  console.log(result);
}

async function main() {
  await networkToNetworkInterconnectsUpdateBfdAdministrativeState();
}

main().catch(console.error);
