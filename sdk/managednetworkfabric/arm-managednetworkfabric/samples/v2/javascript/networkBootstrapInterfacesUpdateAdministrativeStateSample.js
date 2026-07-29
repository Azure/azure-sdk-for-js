// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureNetworkFabricManagementServiceAPI } = require("@azure/arm-managednetworkfabric");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to update the admin state of the Network Interface.
 *
 * @summary update the admin state of the Network Interface.
 * x-ms-original-file: 2025-07-15/NetworkBootstrapInterfaces_UpdateAdministrativeState.json
 */
async function networkBootstrapInterfacesUpdateAdministrativeStateMaximumSetGeneratedByMaximumSetRule() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "1234ABCD-0A1B-1234-5678-123456ABCDEF";
  const client = new AzureNetworkFabricManagementServiceAPI(credential, subscriptionId);
  const result = await client.networkBootstrapInterfaces.updateAdministrativeState(
    "example-rg",
    "example-device",
    "example-interface",
    { resourceIds: [""], state: "Enable" },
  );
  console.log(result);
}

async function main() {
  await networkBootstrapInterfacesUpdateAdministrativeStateMaximumSetGeneratedByMaximumSetRule();
}

main().catch(console.error);
