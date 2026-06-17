// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureNetworkFabricManagementServiceAPI } = require("@azure/arm-managednetworkfabric");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to updates the Network Bootstrap Device to use the latest passwords. Does not generate new passwords. Allows network bootstrap devices missed during a previous password rotation to be brought back into sync.
 *
 * @summary updates the Network Bootstrap Device to use the latest passwords. Does not generate new passwords. Allows network bootstrap devices missed during a previous password rotation to be brought back into sync.
 * x-ms-original-file: 2025-07-15/NetworkBootstrapDevices_ResyncPasswords.json
 */
async function resyncTheLatestPasswordsToTheNetworkBootstrapDeviceGeneratedByMaximumSetRuleGeneratedByMaximumSetRule() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "1234ABCD-0A1B-1234-5678-123456ABCDEF";
  const client = new AzureNetworkFabricManagementServiceAPI(credential, subscriptionId);
  const result = await client.networkBootstrapDevices.resyncPasswords(
    "example-rg",
    "example-device",
  );
  console.log(result);
}

async function main() {
  await resyncTheLatestPasswordsToTheNetworkBootstrapDeviceGeneratedByMaximumSetRuleGeneratedByMaximumSetRule();
}

main().catch(console.error);
