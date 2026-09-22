// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureNetworkFabricManagementServiceAPI } = require("@azure/arm-managednetworkfabric");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to delete the Network Bootstrap Interface resource.
 *
 * @summary delete the Network Bootstrap Interface resource.
 * x-ms-original-file: 2025-07-15/NetworkBootstrapInterfaces_Delete.json
 */
async function networkBootstrapInterfacesDeleteMaximumSetGeneratedByMaximumSetRuleGeneratedByMaximumSetRule() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "1234ABCD-0A1B-1234-5678-123456ABCDEF";
  const client = new AzureNetworkFabricManagementServiceAPI(credential, subscriptionId);
  await client.networkBootstrapInterfaces.delete(
    "example-rg",
    "example-device",
    "example-interface",
  );
}

async function main() {
  await networkBootstrapInterfacesDeleteMaximumSetGeneratedByMaximumSetRuleGeneratedByMaximumSetRule();
}

main().catch(console.error);
