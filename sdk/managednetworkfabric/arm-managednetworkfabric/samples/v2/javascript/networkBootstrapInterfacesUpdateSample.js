// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureNetworkFabricManagementServiceAPI } = require("@azure/arm-managednetworkfabric");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to update certain properties of the Network Bootstrap Interface resource.
 *
 * @summary update certain properties of the Network Bootstrap Interface resource.
 * x-ms-original-file: 2025-07-15/NetworkBootstrapInterfaces_Update.json
 */
async function networkBootstrapInterfacesUpdateMaximumSetGeneratedByMaximumSetRuleGeneratedByMaximumSetRule() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "1234ABCD-0A1B-1234-5678-123456ABCDEF";
  const client = new AzureNetworkFabricManagementServiceAPI(credential, subscriptionId);
  const result = await client.networkBootstrapInterfaces.update(
    "example-rg",
    "example-device",
    "example-interface",
    { annotation: "annotation", serialNumber: "Vendor;Model;HardwareRevisionId;SerialNumber" },
  );
  console.log(result);
}

async function main() {
  await networkBootstrapInterfacesUpdateMaximumSetGeneratedByMaximumSetRuleGeneratedByMaximumSetRule();
}

main().catch(console.error);
