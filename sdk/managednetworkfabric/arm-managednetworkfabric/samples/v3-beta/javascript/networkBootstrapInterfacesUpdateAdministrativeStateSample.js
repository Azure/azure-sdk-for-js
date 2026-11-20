// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureNetworkFabricManagementServiceAPI } = require("@azure/arm-managednetworkfabric");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to update the admin state of the Network Interface.
 *
 * @summary update the admin state of the Network Interface.
 * x-ms-original-file: 2026-01-15-preview/NetworkBootstrapInterfaces_UpdateAdministrativeState.json
 */
async function networkBootstrapInterfacesUpdateAdministrativeStateMaximumSetGeneratedByMaximumSetRuleGeneratedByMaximumSetRule() {
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
  await networkBootstrapInterfacesUpdateAdministrativeStateMaximumSetGeneratedByMaximumSetRuleGeneratedByMaximumSetRule();
}

main().catch(console.error);
