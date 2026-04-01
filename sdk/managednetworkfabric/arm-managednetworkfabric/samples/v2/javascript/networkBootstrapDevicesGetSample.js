// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureNetworkFabricManagementServiceAPI } = require("@azure/arm-managednetworkfabric");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets a Network Bootstrap Device resource details.
 *
 * @summary gets a Network Bootstrap Device resource details.
 * x-ms-original-file: 2025-07-15/NetworkBootstrapDevices_Get.json
 */
async function networkBootstrapDevicesGetMaximumSetGeneratedByMaximumSetRuleGeneratedByMaximumSetRule() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "1234ABCD-0A1B-1234-5678-123456ABCDEF";
  const client = new AzureNetworkFabricManagementServiceAPI(credential, subscriptionId);
  const result = await client.networkBootstrapDevices.get("example-rg", "example-device");
  console.log(result);
}

async function main() {
  await networkBootstrapDevicesGetMaximumSetGeneratedByMaximumSetRuleGeneratedByMaximumSetRule();
}

main().catch(console.error);
