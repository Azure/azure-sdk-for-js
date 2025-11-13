// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ManagedNetworkFabricClient } = require("@azure/arm-managednetworkfabric");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to update the admin state of the Network Interface.
 *
 * @summary update the admin state of the Network Interface.
 * x-ms-original-file: 2024-06-15-preview/NetworkInterfaces_UpdateAdministrativeState.json
 */
async function networkInterfacesUpdateAdministrativeStateMaximumSetGen() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "0000ABCD-0A0B-0000-0000-000000ABCDEF";
  const client = new ManagedNetworkFabricClient(credential, subscriptionId);
  const result = await client.networkInterfaces.updateAdministrativeState(
    "example-rg",
    "example-device",
    "example-interface",
    { resourceIds: [""], state: "Enable" },
  );
  console.log(result);
}

async function main() {
  await networkInterfacesUpdateAdministrativeStateMaximumSetGen();
}

main().catch(console.error);
