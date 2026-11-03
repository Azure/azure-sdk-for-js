// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureNetworkFabricManagementServiceAPI } from "@azure/arm-managednetworkfabric";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to upgrades the version of the Network Bootstrap Device.
 *
 * @summary upgrades the version of the Network Bootstrap Device.
 * x-ms-original-file: 2025-07-15/NetworkBootstrapDevices_Upgrade.json
 */
async function networkBootstrapDevicesUpgradeMaximumSetGeneratedByMaximumSetRuleGeneratedByMaximumSetRule(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "1234ABCD-0A1B-1234-5678-123456ABCDEF";
  const client = new AzureNetworkFabricManagementServiceAPI(credential, subscriptionId);
  const result = await client.networkBootstrapDevices.upgrade("example-rg", "example-device", {
    version: "1.0",
  });
  console.log(result);
}

async function main(): Promise<void> {
  await networkBootstrapDevicesUpgradeMaximumSetGeneratedByMaximumSetRuleGeneratedByMaximumSetRule();
}

main().catch(console.error);
