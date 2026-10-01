// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureNetworkFabricManagementServiceAPI } = require("@azure/arm-managednetworkfabric");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to deletes a Network Bootstrap Device resource.
 *
 * @summary deletes a Network Bootstrap Device resource.
 * x-ms-original-file: 2025-07-15/NetworkBootstrapDevices_Delete.json
 */
async function networkBootstrapDevicesDeleteMaximumSetGeneratedByMaximumSetRuleGeneratedByMaximumSetRule() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "1234ABCD-0A1B-1234-5678-123456ABCDEF";
  const client = new AzureNetworkFabricManagementServiceAPI(credential, subscriptionId);
  await client.networkBootstrapDevices.delete("example-rg", "example-device");
}

async function main() {
  await networkBootstrapDevicesDeleteMaximumSetGeneratedByMaximumSetRuleGeneratedByMaximumSetRule();
}

main().catch(console.error);
