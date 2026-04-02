// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureNetworkFabricManagementServiceAPI } = require("@azure/arm-managednetworkfabric");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get the Network Bootstrap Interface resource details.
 *
 * @summary get the Network Bootstrap Interface resource details.
 * x-ms-original-file: 2025-07-15/NetworkBootstrapInterfaces_Get.json
 */
async function networkBootstrapInterfacesGetMaximumSetGeneratedByMaximumSetRuleGeneratedByMaximumSetRule() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "1234ABCD-0A1B-1234-5678-123456ABCDEF";
  const client = new AzureNetworkFabricManagementServiceAPI(credential, subscriptionId);
  const result = await client.networkBootstrapInterfaces.get(
    "example-rg",
    "example-device",
    "example-interface",
  );
  console.log(result);
}

async function main() {
  await networkBootstrapInterfacesGetMaximumSetGeneratedByMaximumSetRuleGeneratedByMaximumSetRule();
}

main().catch(console.error);
