// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureNetworkFabricManagementServiceAPI } = require("@azure/arm-managednetworkfabric");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to refreshes the configuration of Network Bootstrap Device.
 *
 * @summary refreshes the configuration of Network Bootstrap Device.
 * x-ms-original-file: 2025-07-15/NetworkBootstrapDevices_RefreshConfiguration.json
 */
async function networkBootstrapDevicesRefreshConfigurationMaximumSetGeneratedByMaximumSetRuleGeneratedByMaximumSetRule() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "1234ABCD-0A1B-1234-5678-123456ABCDEF";
  const client = new AzureNetworkFabricManagementServiceAPI(credential, subscriptionId);
  const result = await client.networkBootstrapDevices.refreshConfiguration(
    "example-rg",
    "example-device",
  );
  console.log(result);
}

async function main() {
  await networkBootstrapDevicesRefreshConfigurationMaximumSetGeneratedByMaximumSetRuleGeneratedByMaximumSetRule();
}

main().catch(console.error);
