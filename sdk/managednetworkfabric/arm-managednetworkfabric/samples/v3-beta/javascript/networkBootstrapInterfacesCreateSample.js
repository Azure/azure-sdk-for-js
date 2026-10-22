// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureNetworkFabricManagementServiceAPI } = require("@azure/arm-managednetworkfabric");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to create a Network Bootstrap Interface resource.
 *
 * @summary create a Network Bootstrap Interface resource.
 * x-ms-original-file: 2026-01-15-preview/NetworkBootstrapInterfaces_Create.json
 */
async function networkBootstrapInterfacesCreateMaximumSetGeneratedByMaximumSetRuleGeneratedByMaximumSetRule() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "1234ABCD-0A1B-1234-5678-123456ABCDEF";
  const client = new AzureNetworkFabricManagementServiceAPI(credential, subscriptionId);
  const result = await client.networkBootstrapInterfaces.create(
    "example-rg",
    "example-device",
    "example-interface",
    { annotation: "annotation", additionalDescription: "additionalDescription" },
  );
  console.log(result);
}

async function main() {
  await networkBootstrapInterfacesCreateMaximumSetGeneratedByMaximumSetRuleGeneratedByMaximumSetRule();
}

main().catch(console.error);
